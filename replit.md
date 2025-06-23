# Meditation Timer PWA

## Overview

This is a full-stack Progressive Web Application (PWA) for a meditation timer built with a modern tech stack. The application features a peaceful, spiritual dark theme with a 30-minute countdown timer, floating animations, and PWA capabilities for offline usage. The architecture follows a client-server separation with Express.js backend and React frontend.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized production builds
- **UI Library**: Radix UI components with shadcn/ui design system
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: React hooks with TanStack Query for server state
- **PWA**: Service worker implementation with manifest.json for app-like experience

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **API Design**: RESTful API structure with `/api` prefix
- **Storage**: Configurable storage interface with in-memory implementation
- **Session Management**: Express session handling with PostgreSQL store capability

### Database Architecture
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Schema**: Type-safe schema definitions in shared directory
- **Migrations**: Drizzle Kit for database migrations
- **Connection**: Neon Database serverless PostgreSQL (configurable)

## Key Components

### Timer System
- **Custom Hook**: `useTimer` manages countdown logic, state, and audio notifications
- **Audio Feedback**: Meditation bell sound with fallback beep generation
- **Progress Visualization**: SVG-based circular progress ring
- **State Management**: Timer states (Ready, Running, Paused, Complete)

### PWA Features
- **Installation Prompt**: Custom hook for PWA installation detection
- **Service Worker**: Caching strategy for offline functionality
- **Web Manifest**: App metadata for native-like installation
- **Notifications**: Browser notification API for meditation completion

### UI Components
- **Timer Display**: Large, readable countdown with hours:minutes:seconds format
- **Control Panel**: Play/pause and reset buttons with hover animations
- **Quick Settings**: Preset timer durations (5, 10, 30, 60 minutes)
- **Responsive Design**: Mobile-first approach with CSS Grid/Flexbox

### Shared Schema
- **Type Safety**: Drizzle-zod integration for runtime validation
- **User Management**: Basic user schema with username/password fields
- **Import/Export**: Shared types between client and server

## Data Flow

1. **Client Initialization**: React app loads with service worker registration
2. **Timer Operations**: Local state management with audio/notification side effects
3. **PWA Installation**: Browser events trigger installation prompts
4. **API Communication**: TanStack Query handles server communication (when needed)
5. **Offline Support**: Service worker serves cached resources when offline

## External Dependencies

### Core Libraries
- **React Ecosystem**: React, React DOM, React Router (Wouter)
- **UI Framework**: Radix UI primitives with shadcn/ui components
- **Development**: Vite, TypeScript, Tailwind CSS
- **State Management**: TanStack Query for server state

### Backend Dependencies
- **Express.js**: Web framework with middleware support
- **Database**: Drizzle ORM with Neon Database adapter
- **Session**: PostgreSQL session store with connect-pg-simple
- **Build Tools**: esbuild for server bundling, tsx for development

### PWA Dependencies
- **Service Worker**: Native browser APIs
- **Web Manifest**: Standard PWA manifest specification
- **Audio**: Web Audio API with HTMLAudioElement fallback

## Deployment Strategy

### Development Environment
- **Dev Server**: Vite development server with HMR
- **Backend**: tsx for TypeScript execution with nodemon-like behavior
- **Database**: Environment variable configuration for DATABASE_URL

### Production Build
1. **Frontend**: Vite builds optimized static assets to `dist/public`
2. **Backend**: esbuild bundles server code to `dist/index.js`
3. **Assets**: Public files served from Express static middleware
4. **Database**: Drizzle migrations applied via `npm run db:push`

### Hosting Configuration
- **Platform**: Replit with autoscale deployment target
- **Port**: Application runs on port 5000, exposed on port 80
- **Environment**: Production mode with NODE_ENV=production
- **Database**: PostgreSQL 16 module enabled in Replit

## Changelog

```
Changelog:
- June 23, 2025. Initial setup
```

## User Preferences

```
Preferred communication style: Simple, everyday language.
```