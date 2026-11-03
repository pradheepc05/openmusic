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

Write-Host "`nPhase 2 verification" -ForegroundColor Cyan
Write-Host "Project: $(Get-Location)"
Write-Host ("=" * 60)

Write-Host "`n[1/5] Phase 2 files" -ForegroundColor Cyan
$files = @(
  'src\mocks\tracks.ts','src\mocks\playlists.ts','src\mocks\genres.ts',
  'src\hooks\useMockLoading.ts',
  'src\components\common\SafeImage.tsx',
  'src\components\common\Slider.tsx',
  'src\components\music\SongCard.tsx',
  'src\components\music\SongList.tsx',
  'src\components\music\PlaylistCard.tsx'
)
foreach ($f in $files) { Check "file $f" { Test-Path $f } }

Write-Host "`n[2/5] Mock data populated" -ForegroundColor Cyan
Check 'mocks/tracks.ts has 20+ tracks' {
  ((Get-Content src\mocks\tracks.ts -Raw) -split "`n" | Select-String "id:\s*'").Count -ge 20
}
Check 'mocks/playlists.ts has 3+ playlists' {
  ((Get-Content src\mocks\playlists.ts -Raw) -split "`n" | Select-String "id:\s*'pl-").Count -ge 3
}

Write-Host "`n[3/5] No Phase 3+ leakage" -ForegroundColor Cyan
Check 'no axios import' {
  -not (Get-ChildItem -Recurse src -Include *.ts,*.tsx |
    Select-String -Pattern "from ['""]axios['""]")
}
Check 'no src/services folder yet' { -not (Test-Path src\services) }
Check 'no src/store folder yet'    { -not (Test-Path src\store) }

Write-Host "`n[4/5] TypeScript + build" -ForegroundColor Cyan

# Windows PowerShell 5.1 treats any stderr from native commands as a fatal
# error when $ErrorActionPreference = 'Stop'. npm/npx write `npm notice` to
# stderr even on success — temporarily allow stderr to pass through.
$prevEAP = $ErrorActionPreference
$ErrorActionPreference = 'Continue'

Write-Host "  Running: npm run build (tsc -b && vite build)" -ForegroundColor DarkGray
$buildOutput = & npm run build --silent 2>&1 | Out-String
$buildExit = $LASTEXITCODE

$ErrorActionPreference = $prevEAP

if ($buildExit -eq 0) {
  Write-Host "  PASS  tsc -b && vite build" -ForegroundColor Green
} else {
  Write-Host "  FAIL  build (exit $buildExit)" -ForegroundColor Red
  Write-Host $buildOutput -ForegroundColor Red
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
  $routes = @('/', '/search', '/search?q=neon', '/explore',
              '/library', '/favorites', '/playlist/pl-focus',
              '/playlist/nope', '/does-not-exist')
  foreach ($r in $routes) {
    Check "route $r -> 200" {
      (Invoke-WebRequest "http://localhost:4173$r" -UseBasicParsing).StatusCode -eq 200
    }
  }
  Check 'SPA shell served at /explore' {
    (Invoke-WebRequest 'http://localhost:4173/explore' -UseBasicParsing).Content -match '<div id="root">'
  }
} finally {
  Stop-Job $previewJob -ErrorAction SilentlyContinue
  Remove-Job $previewJob -Force -ErrorAction SilentlyContinue
}

Write-Host "`n" + ("=" * 60)
if ($failures -eq 0) {
  Write-Host "Phase 2: PASS" -ForegroundColor Green
  exit 0
} else {
  Write-Host "Phase 2: $failures failure(s)" -ForegroundColor Red
  exit 1
}