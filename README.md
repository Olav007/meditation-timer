# Meditation Timer PWA

A peaceful meditation timer Progressive Web Application with a spiritual dark theme and calming atmosphere for focused meditation sessions.

## Features

- **30+ Minute Timer**: Default 31-minute meditation session with customizable presets
- **Hierarchical Time Display**: Extra-large minutes in ethereal cyan, medium seconds in muted tone, tiny hours in low opacity
- **Spiritual Dark Theme**: Cosmic gradients with floating star animations
- **Progressive Web App**: Installable on mobile and desktop devices
- **Quick Presets**: 5m, 10m, 31m, 45m, and 60m meditation sessions
- **Audio Notifications**: Meditation bell sound with fallback beep
- **Browser Notifications**: Desktop notifications when session completes
- **Offline Support**: Service worker caching for offline usage

## Technology Stack

- **Frontend**: Pure HTML, CSS, and JavaScript (no build process)
- **Styling**: Tailwind CSS via CDN + Custom CSS
- **PWA**: Service Worker + Web Manifest
- **Deployment**: Static hosting (Replit, Netlify, Vercel, GitHub Pages)

## Installation

### Option 1: Static Version (Recommended)
1. Clone the repository
2. **Serve via local server** (required for PWA features):
   
   **Python (if installed):**
   ```bash
   python -m http.server 8000
   # or for Python 2: python -m SimpleHTTPServer 8000
   ```
   
   **Node.js (if installed):**
   ```bash
   npx serve .
   # or: npx http-server
   ```
   
   **VS Code Live Server:**
   - Install "Live Server" extension
   - Right-click `static.html` → "Open with Live Server"

3. Open `http://localhost:8000/static.html` in your browser
4. No build process required!

### Option 2: React Version
1. Clone the repository
2. Install dependencies: `npm install`
3. Start development server: `npm run dev`
4. Open your browser to `http://localhost:5000`

## Deployment

### Static Deployment (Recommended)
- Upload `static.html` and `client/public/` folder to any static hosting service
- Recommended URL: `meditation-timer.replit.app`
- Works with: Netlify, Vercel, GitHub Pages, Replit Static

### Full-Stack Deployment
- Use the React version with Express.js backend on Replit autoscale

## PWA Installation

Users can install the meditation timer as a Progressive Web App:
1. Open the app in a supported browser
2. Look for the installation prompt
3. Click "Install" to add to home screen
4. Launch the app like any native application

## Architecture

The application follows a modern full-stack architecture:
- **Client**: React SPA with PWA capabilities
- **Server**: Express.js API server with session management
- **Database**: PostgreSQL with Drizzle ORM (optional for user data)
- **Build**: Vite for frontend, esbuild for backend

## License

MIT License - feel free to use this code for your own meditation practice or projects.