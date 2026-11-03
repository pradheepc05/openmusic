$ErrorActionPreference = 'Stop'
$failures = 0

function Check($name, [scriptblock]$test) {
  try {
    $ok = & $test
    if ($ok) { Write-Host "  PASS  $name" -ForegroundColor Green }
    else     { Write-Host "  FAIL  $name" -ForegroundColor Red; $script:failures++ }
  } catch {
    Write-Host "  FAIL  $name ($_)" -ForegroundColor Red; $script:failures++
  }
}

Write-Host "`nPhase 4 verification" -ForegroundColor Cyan
Write-Host "Project: $(Get-Location)"
Write-Host ("=" * 60)

Write-Host "`n[1/5] Phase 4 files" -ForegroundColor Cyan
foreach ($f in @('src\services\providers\jamendoProvider.ts')) {
  Check "file $f" { Test-Path $f }
}

Write-Host "`n[2/5] Jamendo registered" -ForegroundColor Cyan
Check 'providerRegistry imports jamendoProvider' {
  (Get-Content src\services\providers\providerRegistry.ts -Raw) -match 'jamendoProvider'
}
Check 'providerRegistry lists 2 providers' {
  (Get-Content src\services\providers\providerRegistry.ts -Raw) -match '\[audiusProvider,\s*jamendoProvider\]'
}
Check 'trackMapper has mapJamendoTrack' {
  (Get-Content src\services\mappers\trackMapper.ts -Raw) -match 'export function mapJamendoTrack'
}

Write-Host "`n[3/5] Env + graceful skip" -ForegroundColor Cyan
Check '.env.example has VITE_JAMENDO_CLIENT_ID' {
  (Get-Content .env.example -Raw) -match 'VITE_JAMENDO_CLIENT_ID'
}

$jamendoId = $env:VITE_JAMENDO_CLIENT_ID
if (-not $jamendoId -and (Test-Path '.env.local')) {
  $line = Get-Content '.env.local' | Where-Object { $_ -match '^VITE_JAMENDO_CLIENT_ID=' } | Select-Object -First 1
  if ($line) { $jamendoId = ($line -split '=', 2)[1].Trim() }
}

if (-not $jamendoId) {
  Write-Host "  SKIP  Jamendo client ID not set (graceful skip is the expected behaviour)" -ForegroundColor Yellow
} else {
  Write-Host "  Using Jamendo client_id: $jamendoId" -ForegroundColor DarkGray
  Check 'Jamendo /tracks/ returns results' {
    $r = Invoke-RestMethod "https://api.jamendo.com/v3.0/tracks/?client_id=$jamendoId&format=json&limit=1&order=popularity_total" -TimeoutSec 15
    $r.headers.status -eq 'success' -and $r.results.Count -gt 0
  }
  Check 'Jamendo search "lofi" returns results' {
    $r = Invoke-RestMethod "https://api.jamendo.com/v3.0/tracks/?client_id=$jamendoId&format=json&limit=1&search=lofi&order=relevance" -TimeoutSec 15
    $r.headers.status -eq 'success'
  }
  Check 'Jamendo tag "lofi" returns results' {
    $r = Invoke-RestMethod "https://api.jamendo.com/v3.0/tracks/?client_id=$jamendoId&format=json&limit=1&tags=lofi&order=popularity_month" -TimeoutSec 15
    $r.headers.status -eq 'success'
  }
}

Write-Host "`n[4/5] TypeScript + build" -ForegroundColor Cyan
$prevEAP = $ErrorActionPreference
$ErrorActionPreference = 'Continue'
Write-Host "  Running: npm run build" -ForegroundColor DarkGray
$buildOut = & npm run build --silent 2>&1 | Out-String
$buildExit = $LASTEXITCODE
$ErrorActionPreference = $prevEAP

if ($buildExit -eq 0) {
  Write-Host "  PASS  tsc -b && vite build" -ForegroundColor Green
} else {
  Write-Host "  FAIL  build (exit $buildExit)" -ForegroundColor Red
  Write-Host $buildOut -ForegroundColor Red
  $script:failures++
}
Check 'dist\index.html exists' { Test-Path dist\index.html }

Write-Host "`n[5/5] SPA routes (preview)" -ForegroundColor Cyan
$previewJob = Start-Job -ScriptBlock {
  Set-Location $using:PWD
  npm run preview
}
Start-Sleep -Seconds 4
try {
  foreach ($r in @('/', '/search?q=lofi', '/explore', '/library', '/favorites')) {
    Check "route $r -> 200" {
      (Invoke-WebRequest "http://localhost:4173$r" -UseBasicParsing).StatusCode -eq 200
    }
  }
} finally {
  Stop-Job $previewJob -ErrorAction SilentlyContinue
  Remove-Job $previewJob -Force -ErrorAction SilentlyContinue
}

Write-Host "`n" + ("=" * 60)
if ($failures -eq 0) {
  Write-Host "Phase 4: PASS" -ForegroundColor Green
  exit 0
} else {
  Write-Host "Phase 4: $failures failure(s)" -ForegroundColor Red
  exit 1
}