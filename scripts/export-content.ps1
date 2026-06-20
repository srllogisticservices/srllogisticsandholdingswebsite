$root = Split-Path -Parent $PSScriptRoot
Set-Location $root
node scripts/export-content.mjs
Write-Host "Content exported to data/services.json"
