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

- **Frontend**: React 18 + TypeScript + Vite
- **UI Components**: Radix UI + shadcn/ui + Tailwind CSS
- **Routing**: Wouter (lightweight React router)
- **State Management**: React hooks + TanStack Query
- **Backend**: Express.js + TypeScript
- **Database**: Drizzle ORM + PostgreSQL (Neon)
- **PWA**: Service Worker + Web Manifest

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open your browser to `http://localhost:5000`

## Deployment

The application is configured for deployment on Replit with autoscale capabilities. The recommended deployment URL is `meditation-timer.replit.app`.

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