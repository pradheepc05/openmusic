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

Write-Host "`nPhase 5 verification" -ForegroundColor Cyan
Write-Host "Project: $(Get-Location)"
Write-Host ("=" * 60)

Write-Host "`n[1/5] Phase 5 files" -ForegroundColor Cyan
$files = @(
  'src\services\audio.ts',
  'src\store\playerStore.ts',
  'src\hooks\useAudioEvents.ts',
  'src\hooks\usePlayer.ts',
  'src\components\music\PlayerControls.tsx',
  'src\components\music\ProgressBar.tsx',
  'src\components\music\VolumeControl.tsx',
  'src\components\music\MiniPlayer.tsx',
  'src\components\music\QueuePanel.tsx'
)
foreach ($f in $files) { Check "file $f" { Test-Path $f } }

Write-Host "`n[2/5] Store + audio wiring" -ForegroundColor Cyan
Check 'audio.ts exports a single Audio instance' {
  $c = Get-Content src\services\audio.ts -Raw
  $c -match 'new Audio\(\)' -and $c -match 'export const audio'
}
Check 'playerStore exports usePlayerStore' {
  (Get-Content src\store\playerStore.ts -Raw) -match 'export const usePlayerStore'
}
Check 'playerStore has playQueue/toggle/next/prev/seek/volume/shuffle/repeat' {
  $c = Get-Content src\store\playerStore.ts -Raw
  $c -match 'playQueue' -and $c -match '\btoggle\b' -and
  $c -match '\bnext\b' -and $c -match '\bprev\b' -and
  $c -match '\bseek\b' -and $c -match 'setVolume' -and
  $c -match 'toggleShuffle' -and $c -match 'cycleRepeat'
}
Check 'MainLayout mounts useAudioEvents' {
  (Get-Content src\components\layout\MainLayout.tsx -Raw) -match 'useAudioEvents'
}
Check 'MainLayout renders MiniPlayer' {
  (Get-Content src\components\layout\MainLayout.tsx -Raw) -match 'MiniPlayer'
}

Write-Host "`n[3/5] Pages wired to playQueue" -ForegroundColor Cyan
foreach ($p in @('Home','Search','Explore','Playlist')) {
  Check "pages/$p.tsx uses playQueue" {
    (Get-Content "src\pages\$p.tsx" -Raw) -match 'playQueue'
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
  Write-Host "Phase 5: PASS" -ForegroundColor Green
  exit 0
} else {
  Write-Host "Phase 5: $failures failure(s)" -ForegroundColor Red
  exit 1
}