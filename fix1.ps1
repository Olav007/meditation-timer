
# Fix for Windows NODE_ENV issue - Meditation Timer
Write-Host "Fixing Windows NODE_ENV issue..." -ForegroundColor Green
Write-Host ""

# Install cross-env for cross-platform environment variables
Write-Host "Installing cross-env for Windows compatibility..." -ForegroundColor Cyan
npm install --save-dev cross-env

Write-Host ""
Write-Host "cross-env installed successfully!" -ForegroundColor Green
Write-Host ""
Write-Host "Now you can run:" -ForegroundColor Yellow
Write-Host "  npm run dev" -ForegroundColor White
Write-Host ""
Write-Host "The meditation timer will start on http://localhost:5000" -ForegroundColor Cyan
Write-Host ""
Write-Host "Note: If you still get NODE_ENV errors, try:" -ForegroundColor Gray
Write-Host "  `$env:NODE_ENV='development'; tsx server/index.ts" -ForegroundColor White
