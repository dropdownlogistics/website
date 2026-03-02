# DDL Dev Session Starter
# Run this once when you open PowerShell:
#   . "C:\Users\dkitc\Downloads\ddl-start.ps1"

$site = "C:\Users\dkitc\OneDrive\ddl-site"
$dl = "C:\Users\dkitc\Downloads"
$ddl = "C:\Users\dkitc\iCloud Drive\iCloudDrive\Documents\02_Dex & Dex Jr\01_SendThenArchive\DDL Website"

Set-Location $site

Write-Host ""
Write-Host "  DDL Dev Environment Loaded" -ForegroundColor Green
Write-Host "  -------------------------" -ForegroundColor DarkGray
Write-Host "  `$site  = $site" -ForegroundColor DarkGray
Write-Host "  `$dl    = $dl" -ForegroundColor DarkGray
Write-Host "  `$ddl   = $ddl" -ForegroundColor DarkGray
Write-Host ""
Write-Host "  Commands:" -ForegroundColor Yellow
Write-Host "    npm run dev          Start dev server"
Write-Host "    git status           Check changes"
Write-Host "    git add -A           Stage all"
Write-Host "    git push             Push to origin"
Write-Host ""
