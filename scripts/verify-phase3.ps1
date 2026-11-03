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

Write-Host "`nPhase 3 verification" -ForegroundColor Cyan
Write-Host "Project: $(Get-Location)"
Write-Host ("=" * 60)

Write-Host "`n[1/5] Phase 3 files" -ForegroundColor Cyan
$files = @(
  'src\services\http.ts',
  'src\services\musicService.ts',
  'src\services\providers\providerRegistry.ts',
  'src\services\providers\audiusProvider.ts',
  'src\services\mappers\trackMapper.ts',
  'src\hooks\useMusic.ts',
  'src\types\provider.ts'
)
foreach ($f in $files) { Check "file $f" { Test-Path $f } }

Write-Host "`n[2/5] Audius API reachable" -ForegroundColor Cyan

# NOTE: $Host is a PowerShell read-only automatic variable.
$audiusHost = $null
try {
  $hostList = Invoke-RestMethod 'https://api.audius.co' -TimeoutSec 15
  if ($hostList.data.Count -gt 0 -and $hostList.data[0] -match '^https?://') {
    $audiusHost = $hostList.data[0]
  }
} catch { $audiusHost = $null }

Check 'api.audius.co returns a host list' {
  [bool]$audiusHost
}

Check 'trending endpoint returns tracks' {
  if (-not $audiusHost) { return $false }
  $r = Invoke-RestMethod "$audiusHost/v1/tracks/trending?app_name=OpenMusic&limit=3" -TimeoutSec 15
  $r.data.Count -gt 0
}

Check 'search endpoint returns tracks for "lofi"' {
  if (-not $audiusHost) { return $false }
  $r = Invoke-RestMethod "$audiusHost/v1/tracks/search?app_name=OpenMusic&query=lofi&limit=3" -TimeoutSec 15
  $r.data.Count -gt 0
}

Write-Host "`n[3/5] Mapper shape" -ForegroundColor Cyan

Check 'trackMapper produces audius: prefixed ids' {
  if (-not $audiusHost) { return $false }
  $raw = (Invoke-RestMethod "$audiusHost/v1/tracks/trending?app_name=OpenMusic&limit=1" -TimeoutSec 15).data[0]
  $mapped = @{
    id        = "audius:$($raw.id)"
    title     = $raw.title
    artist    = $raw.user.name
    streamUrl = "$audiusHost/v1/tracks/$($raw.id)/stream"
  }
  $mapped.id -like 'audius:*' -and
  $mapped.streamUrl -like '*/v1/tracks/*/stream' -and
  [bool]$mapped.title -and
  [bool]$mapped.artist
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
  $routes = @('/', '/search?q=lofi', '/explore', '/library', '/favorites')
  foreach ($r in $routes) {
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
  Write-Host "Phase 3: PASS" -ForegroundColor Green
  exit 0
} else {
  Write-Host "Phase 3: $failures failure(s)" -ForegroundColor Red
  exit 1
}