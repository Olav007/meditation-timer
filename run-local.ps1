Write-Host "Starting Meditation Timer..." -ForegroundColor Green
Write-Host ""

# Check for Python
try {
    $pythonVersion = python --version 2>$null
    if ($LASTEXITCODE -eq 0) {
        Write-Host "Python found: $pythonVersion" -ForegroundColor Cyan
        Write-Host "Starting server on http://localhost:8000" -ForegroundColor Yellow
        Write-Host "Open: http://localhost:8000" -ForegroundColor White
        Write-Host ""
        Write-Host "Press Ctrl+C to stop the server" -ForegroundColor Gray
        Write-Host ""
        
        # Start Python HTTP server
        python -m http.server 8000
    }
} catch {
    Write-Host "Python not found." -ForegroundColor Red
    
    # Check for Node.js as fallback
    try {
        $nodeVersion = node --version 2>$null
        if ($LASTEXITCODE -eq 0) {
            Write-Host "Node.js found: $nodeVersion" -ForegroundColor Cyan
            Write-Host "Starting server with npx serve..." -ForegroundColor Yellow
            Write-Host "Open: http://localhost:8000" -ForegroundColor White
            Write-Host ""
            Write-Host "Press Ctrl+C to stop the server" -ForegroundColor Gray
            Write-Host ""
            
            npx serve . -p 8000 -s
        }
    } catch {
        Write-Host "Neither Python nor Node.js found." -ForegroundColor Red
        Write-Host ""
        Write-Host "Please install Python from https://python.org" -ForegroundColor Yellow
        Write-Host "Or use VS Code Live Server extension:" -ForegroundColor Yellow
        Write-Host "1. Install VS Code" -ForegroundColor White
        Write-Host "2. Install 'Live Server' extension" -ForegroundColor White
        Write-Host "3. Right-click index.html and select 'Open with Live Server'" -ForegroundColor White
        Write-Host ""
        Read-Host "Press Enter to exit"
    }
}