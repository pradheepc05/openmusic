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

Write-Host "`nPhase 6 verification" -ForegroundColor Cyan
Write-Host "Project: $(Get-Location)"
Write-Host ("=" * 60)

Write-Host "`n[1/5] Phase 6 files" -ForegroundColor Cyan
$files = @(
  'src\store\libraryStore.ts',
  'src\store\playlistStore.ts',
  'src\components\music\FavoriteButton.tsx',
  'src\components\music\AddToPlaylistMenu.tsx',
  'src\components\music\CreatePlaylistDialog.tsx'
)
foreach ($f in $files) { Check "file $f" { Test-Path $f } }

Write-Host "`n[2/5] Store shapes" -ForegroundColor Cyan
Check 'libraryStore has favorites + recentlyPlayed + toggleFavorite' {
  $c = Get-Content src\store\libraryStore.ts -Raw
  $c -match 'favorites' -and $c -match 'recentlyPlayed' -and
  $c -match 'toggleFavorite' -and $c -match 'addRecentlyPlayed'
}
Check 'playlistStore has CRUD actions' {
  $c = Get-Content src\store\playlistStore.ts -Raw
  $c -match 'createPlaylist' -and $c -match 'renamePlaylist' -and
  $c -match 'deletePlaylist' -and $c -match 'addToPlaylist' -and
  $c -match 'removeFromPlaylist'
}
Check 'both stores use zustand/persist' {
  $lib = Get-Content src\store\libraryStore.ts -Raw
  $pl  = Get-Content src\store\playlistStore.ts -Raw
  $lib -match 'persist\(' -and $pl -match 'persist\('
}
Check 'playerStore records recently played' {
  (Get-Content src\store\playerStore.ts -Raw) -match 'addRecentlyPlayed'
}

Write-Host "`n[3/5] Pages wired to real stores" -ForegroundColor Cyan
Check 'Favorites uses libraryStore' {
  (Get-Content src\pages\Favorites.tsx -Raw) -match 'useLibraryStore'
}
Check 'Library uses playlistStore + libraryStore' {
  $c = Get-Content src\pages\Library.tsx -Raw
  $c -match 'usePlaylistStore' -and $c -match 'useLibraryStore'
}
Check 'Playlist uses playlistStore' {
  (Get-Content src\pages\Playlist.tsx -Raw) -match 'usePlaylistStore'
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
  foreach ($r in @('/', '/search?q=lofi', '/explore', '/library', '/favorites', '/playlist/abc')) {
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
  Write-Host "Phase 6: PASS" -ForegroundColor Green
  exit 0
} else {
  Write-Host "Phase 6: $failures failure(s)" -ForegroundColor Red
  exit 1
}