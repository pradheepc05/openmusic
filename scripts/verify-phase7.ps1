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

Write-Host "`nPhase 7 verification" -ForegroundColor Cyan
Write-Host "Project: $(Get-Location)"
Write-Host ("=" * 60)

Write-Host "`n[1/5] Deployment config" -ForegroundColor Cyan
Check 'vercel.json exists' { Test-Path vercel.json }
Check 'vercel.json has SPA catch-all rewrite' {
  $c = Get-Content vercel.json -Raw
  $c -match '"/\(\.\*\)"' -and $c -match '"/index.html"'
}

Write-Host "`n[2/5] Supabase (optional)" -ForegroundColor Cyan
$hasSupabaseFiles = (Test-Path src\services\supabase.ts) -and (Test-Path src\store\authStore.ts)
if (-not $hasSupabaseFiles) {
  Write-Host "  SKIP  Supabase not configured (app runs in local-only mode)" -ForegroundColor Yellow
} else {
  Check 'supabase.ts exports supabase client' {
    (Get-Content src\services\supabase.ts -Raw) -match 'createClient'
  }
  Check 'authStore exports useAuthStore' {
    (Get-Content src\store\authStore.ts -Raw) -match 'export const useAuthStore'
  }
  Check 'Login page exists' { Test-Path src\pages\Login.tsx }
  Check 'App.tsx registers /login route' {
    (Get-Content src\App.tsx -Raw) -match 'path="/login"'
  }
}

Write-Host "`n[3/5] TypeScript + build" -ForegroundColor Cyan
$prevEAP = $ErrorActionPreference
$ErrorActionPreference = 'Continue'
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

Write-Host "`n[4/5] SPA routes (preview)" -ForegroundColor Cyan
$previewJob = Start-Job -ScriptBlock {
  Set-Location $using:PWD
  npm run preview
}
Start-Sleep -Seconds 4
try {
  foreach ($r in @('/', '/search?q=lofi', '/explore', '/library', '/favorites', '/playlist/abc', '/login', '/does-not-exist')) {
    Check "route $r -> 200" {
      (Invoke-WebRequest "http://localhost:4173$r" -UseBasicParsing).StatusCode -eq 200
    }
  }
} finally {
  Stop-Job $previewJob -ErrorAction SilentlyContinue
  Remove-Job $previewJob -Force -ErrorAction SilentlyContinue
}

Write-Host "`n[5/5] Deployment readiness" -ForegroundColor Cyan
Check '.env.example has VITE_AUDIUS_APP_NAME' {
  (Get-Content .env.example -Raw) -match 'VITE_AUDIUS_APP_NAME'
}
Check '.gitignore ignores .env.local' {
  (Get-Content .gitignore -Raw) -match '(?m)^\s*\.env\.local\s*$'
}

Write-Host "`n" + ("=" * 60)
if ($failures -eq 0) {
  Write-Host "Phase 7: PASS" -ForegroundColor Green
  exit 0
} else {
  Write-Host "Phase 7: $failures failure(s)" -ForegroundColor Red
  exit 1
}