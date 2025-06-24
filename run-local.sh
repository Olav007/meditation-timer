#!/bin/bash
echo "Starting Meditation Timer..."
echo

if command -v python3 &> /dev/null; then
    echo "Python found! Starting server on http://localhost:8000"
    echo "Open: http://localhost:8000/static.html"
    echo
    python3 -m http.server 8000
elif command -v python &> /dev/null; then
    echo "Python found! Starting server on http://localhost:8000"
    echo "Open: http://localhost:8000/static.html"
    echo
    python -m http.server 8000
elif command -v node &> /dev/null; then
    echo "Node.js found! Installing serve..."
    npx serve . -p 8000
else
    echo "Neither Python nor Node.js found."
    echo "Please install one of them or use VS Code Live Server extension."
    echo
    echo "Alternative: Open static.html directly in browser"
    echo "(PWA features won't work, but basic timer will)"
fi