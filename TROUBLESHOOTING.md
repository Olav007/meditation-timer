# Troubleshooting Meditation Timer

## Common Issues and Solutions

### 1. Blank Page or Only Blue Background
**Problem:** JavaScript not executing
**Solution:** Must serve from web server, not open as file

### 2. Directory Listing Instead of Timer
**Problem:** Accessing wrong URL
**Solution:** Go to `http://localhost:8000` (not `/static.html`)

### 3. Server Won't Start
**Solutions by system:**
- **Python:** `python -m http.server 8000`
- **Node.js:** `npx serve . -p 8000`
- **VS Code:** Install Live Server extension

### 4. Timer Doesn't Work
**Check browser console (F12):**
- JavaScript errors?
- Network errors loading scripts?
- Content Security Policy errors?

### 5. Quick Test
Open browser developer tools (F12) and check:
1. Console tab for errors
2. Network tab for failed requests
3. Application tab for service worker status

## Working URLs After Server Start:
- Main timer: `http://localhost:8000`
- Alternative: `http://localhost:8000/static.html`

## Files That Should Load:
- `index.html` (main timer)
- `manifest.json` (PWA config)
- `sw.js` (service worker)
- External: Tailwind CSS, Google Fonts

## If Nothing Works:
Try the React version instead:
```bash
npm install
npm run dev
```
Then go to `http://localhost:5000`