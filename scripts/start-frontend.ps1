# Start frontend dev server (from project root)
$root = Split-Path -Parent $PSScriptRoot
Set-Location "$root\frontend"

if (-not (Test-Path "node_modules")) {
    npm install
}

Write-Host "Starting frontend on http://localhost:5173"
npm run dev
