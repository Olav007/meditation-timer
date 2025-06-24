@echo off
echo Starting Meditation Timer...
echo.
echo Checking for Python...
python --version >nul 2>&1
if %errorlevel% == 0 (
    echo Python found! Starting server on http://localhost:8000
    echo Open: http://localhost:8000/static.html
    echo.
    python -m http.server 8000
) else (
    echo Python not found. Checking for Node.js...
    node --version >nul 2>&1
    if %errorlevel% == 0 (
        echo Node.js found! Installing serve...
        npx serve . -p 8000
    ) else (
        echo Neither Python nor Node.js found.
        echo Please install one of them or use VS Code Live Server extension.
        echo.
        echo Alternative: Open static.html directly in browser
        echo ^(PWA features won't work, but basic timer will^)
        pause
    )
)