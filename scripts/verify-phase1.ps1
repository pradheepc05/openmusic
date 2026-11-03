# ============================================================
# OpenMusic — Phase 1 Checker
# ============================================================

$ErrorActionPreference = 'Continue'

function Find-ProjectRoot {
    $dir = (Get-Location).Path
    for ($i = 0; $i -lt 6; $i++) {
        if (Test-Path (Join-Path $dir 'package.json')) { return $dir }
        if (Test-Path (Join-Path $dir 'openmusic\package.json')) { return (Join-Path $dir 'openmusic') }
        $parent = Split-Path $dir -Parent
        if (-not $parent -or $parent -eq $dir) { break }
        $dir = $parent
    }
    return $null
}

$root = Find-ProjectRoot
if (-not $root) { Write-Host "Project package.json not found." -ForegroundColor Red; exit 1 }
Set-Location $root

Write-Host "Project: $root" -ForegroundColor Cyan
Write-Host ("=" * 60)

$fail = 0
function Check($Name, [scriptblock]$Body) {
    try {
        if (& $Body) { Write-Host "  PASS  $Name" -ForegroundColor Green }
        else { Write-Host "  FAIL  $Name" -ForegroundColor Red; $script:fail++ }
    }
    catch {
        Write-Host "  FAIL  $Name ($($_.Exception.Message))" -ForegroundColor Red
        $script:fail++
    }
}

# [1/6] Files
Write-Host "`n[1/6] Files" -ForegroundColor Yellow
$files = @(
    'vite.config.ts','vercel.json','.env.example','.gitignore','index.html',
    'src\main.tsx','src\App.tsx','src\styles\globals.css',
    'src\components\layout\Sidebar.tsx','src\components\layout\Topbar.tsx',
    'src\components\layout\MainLayout.tsx',
    'src\components\common\ErrorBoundary.tsx','src\components\common\Loader.tsx',
    'src\components\common\EmptyState.tsx','src\components\common\Skeleton.tsx',
    'src\pages\Home.tsx','src\pages\Search.tsx','src\pages\Explore.tsx',
    'src\pages\Library.tsx','src\pages\Playlist.tsx','src\pages\Favorites.tsx',
    'src\pages\NotFound.tsx',
    'src\constants\routes.ts','src\constants\config.ts',
    'src\types\env.d.ts','src\types\music.ts',
    'src\utils\cn.ts','src\utils\formatTime.ts'
)
foreach ($f in $files) { Check "file $f" { Test-Path $f } }

# [2/6] Packages
Write-Host "`n[2/6] Packages" -ForegroundColor Yellow
foreach ($p in @(
    'react','react-dom','react-router-dom','axios','zustand',
    'lucide-react','tailwindcss','@tailwindcss/vite','typescript','vite'
)) {
    Check "package $p" { Test-Path (Join-Path 'node_modules' $p) }
}

# [3/6] Tailwind
Write-Host "`n[3/6] Tailwind" -ForegroundColor Yellow
Check 'vite.config.ts registers tailwindcss()' {
    (Get-Content 'vite.config.ts' -Raw) -match 'tailwindcss'
}
Check 'globals.css imports tailwindcss' {
    (Get-Content 'src\styles\globals.css' -Raw) -match '@import\s+["'']tailwindcss["'']'
}

# [4/6] Gitignore
Write-Host "`n[4/6] Gitignore" -ForegroundColor Yellow
Check '.gitignore ignores .env' {
    (Get-Content '.gitignore' -Raw) -match '(?m)^\.env'
}
Check '.env.local is not tracked' {
    -not (git ls-files 2>$null | Select-String -Pattern '\.env\.local' -Quiet)
}

# [5/6] TypeScript + build — run node.exe directly (bypasses broken .cmd exit codes)
Write-Host "`n[5/6] TypeScript + build" -ForegroundColor Yellow

$tscBin  = Join-Path $root 'node_modules\typescript\bin\tsc'
$viteBin = Join-Path $root 'node_modules\vite\bin\vite.js'

Check 'typescript bin exists'  { Test-Path $tscBin }
Check 'vite bin exists'        { Test-Path $viteBin }

Check 'tsc -b (typecheck)' {
    $out = & node $tscBin -b 2>&1
    $code = $LASTEXITCODE
    if ($code -ne 0) { Write-Host ($out | Out-String) -ForegroundColor DarkGray }
    return ($code -eq 0)
}

Check 'vite build' {
    $out = & node $viteBin build 2>&1
    $code = $LASTEXITCODE
    if ($code -ne 0) { Write-Host ($out | Out-String) -ForegroundColor DarkGray }
    return ($code -eq 0)
}

Check 'dist/index.html exists' { Test-Path 'dist\index.html' }

# [6/6] SPA routes
Write-Host "`n[6/6] SPA routes (preview)" -ForegroundColor Yellow

$preview = $null
try {
    $preview = Start-Process `
        -FilePath 'npm.cmd' `
        -ArgumentList 'run preview -- --host 127.0.0.1' `
        -NoNewWindow -PassThru `
        -RedirectStandardOutput "$env:TEMP\om-prev.out" `
        -RedirectStandardError  "$env:TEMP\om-prev.err"

    Start-Sleep -Seconds 4

    foreach ($route in @(
        '/','/search','/explore','/library',
        '/playlist/abc','/favorites','/does-not-exist'
    )) {
        Check "route $route -> 200" {
            (Invoke-WebRequest "http://127.0.0.1:4173$route" `
                -UseBasicParsing -TimeoutSec 5).StatusCode -eq 200
        }
    }
    Check 'route /search serves SPA shell' {
        (Invoke-WebRequest 'http://127.0.0.1:4173/search' `
            -UseBasicParsing -TimeoutSec 5).Content -match '<div id="root">'
    }
}
catch {
    Write-Host "Preview error: $($_.Exception.Message)" -ForegroundColor Red
    $fail++
}
finally {
    if ($preview -and -not $preview.HasExited) {
        Stop-Process -Id $preview.Id -Force -ErrorAction SilentlyContinue
    }
    Get-NetTCPConnection -LocalPort 4173 -ErrorAction SilentlyContinue |
        ForEach-Object { Stop-Process -Id $_.OwningProcess -Force -ErrorAction SilentlyContinue }
    Remove-Item "$env:TEMP\om-prev.out","$env:TEMP\om-prev.err" -Force -ErrorAction SilentlyContinue
}

# Summary
Write-Host "`n" + ("=" * 60)
if ($fail -eq 0) {
    Write-Host "Phase 1: PASS" -ForegroundColor Green
    exit 0
} else {
    Write-Host "Phase 1: FAIL ($fail assertion(s) failed)" -ForegroundColor Red
    exit 1
}