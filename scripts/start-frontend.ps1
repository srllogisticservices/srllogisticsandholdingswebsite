# Start SRL Logistics and Holdings frontend (from project root)
$root = Split-Path -Parent $PSScriptRoot
$frontend = Join-Path $root 'frontend'
$packageJson = Join-Path $frontend 'package.json'

if (-not (Test-Path $packageJson)) {
    Write-Error "SRL frontend not found at $frontend. Run from SRL_logistics_and_Holdings folder."
    exit 1
}

$name = (Get-Content $packageJson -Raw | ConvertFrom-Json).name
if ($name -ne 'srl-logistics-and-holdings') {
    Write-Error "Wrong project: expected srl-logistics-and-holdings, found $name"
    exit 1
}

$on5173 = Get-NetTCPConnection -LocalPort 5173 -State Listen -ErrorAction SilentlyContinue
if ($on5173) {
    Write-Host 'Port 5173 is in use - stopping other process...'
    $on5173 | ForEach-Object { Stop-Process -Id $_.OwningProcess -Force -ErrorAction SilentlyContinue }
    Start-Sleep -Seconds 2
}

Get-CimInstance Win32_Process -ErrorAction SilentlyContinue |
    Where-Object { $_.CommandLine -like '*waste-management-database*vite*' } |
    ForEach-Object { Stop-Process -Id $_.ProcessId -Force -ErrorAction SilentlyContinue }

Set-Location $frontend

if (-not (Test-Path 'node_modules')) {
    npm install
}

Write-Host 'Starting SRL Logistics and Holdings on http://localhost:5173'
npm run dev
