# Start backend API (from project root)
$root = Split-Path -Parent $PSScriptRoot
Set-Location $root

$pythonExe = $null
if (Test-Path ".\venv313\Scripts\python.exe") {
    $pythonExe = ".\venv313\Scripts\python.exe"
} elseif (Test-Path ".\venv\Scripts\python.exe") {
    $pythonExe = ".\venv\Scripts\python.exe"
} else {
    Write-Host "Creating Python 3.13 virtual environment..."
    py -3.13 -m venv venv313
    $pythonExe = ".\venv313\Scripts\python.exe"
    & $pythonExe -m pip install -r backend\requirements.txt
}

$env:DATA_DIR = "$root\data"
$env:DATABASE_URL = "sqlite:///$($root -replace '\\','/')/data/srl.db"
$env:BACKUP_DIR = "$root\backups"
$env:ADMIN_USERNAME = if ($env:ADMIN_USERNAME) { $env:ADMIN_USERNAME } else { "admin" }
$env:ADMIN_PASSWORD = if ($env:ADMIN_PASSWORD) { $env:ADMIN_PASSWORD } else { "SRLAdmin2026!" }
$env:ADMIN_DISPLAY_NAME = if ($env:ADMIN_DISPLAY_NAME) { $env:ADMIN_DISPLAY_NAME } else { "System Administrator" }

Write-Host "Starting API on http://localhost:8000"
Write-Host "Admin login: http://localhost:5173/admin/login (username: $env:ADMIN_USERNAME)"
Set-Location backend
& "$root\$pythonExe" -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
