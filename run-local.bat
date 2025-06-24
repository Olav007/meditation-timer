@echo off
echo Starting Meditation Timer...
echo.
echo Checking for Node.js...
node --version >nul 2>&1
if %errorlevel% == 0 (
    echo Node.js found! Starting server on http://localhost:8000
    echo Open: http://localhost:8000
    echo.
    echo Press Ctrl+C to stop the server
    npx serve . -p 8000 -s
) else (
    echo Node.js not found. Checking for Python...
    python --version >nul 2>&1
    if %errorlevel% == 0 (
        echo Python found! Starting server on http://localhost:8000
        echo Open: http://localhost:8000
        echo.
        echo Press Ctrl+C to stop the server
        python -m http.server 8000
    ) else (
        echo Neither Node.js nor Python found.
        echo Please install Node.js from https://nodejs.org
        echo.
        echo Alternative: Use VS Code Live Server extension
        echo 1. Install VS Code
        echo 2. Install "Live Server" extension
        echo 3. Right-click index.html and select "Open with Live Server"
        pause
    )
)