const CACHE_NAME = 'meditation-timer-v2';
const urlsToCache = [
  '/',
  '/meditation-timer',
  '/src/main.tsx',
  '/src/index.css',
  '/meditation-bell.mp3',
  'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap'
];

// Install event
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urlsToCache);
      })
  );
  // Force activation of new service worker
  self.skipWaiting();
});

// Fetch event
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Return cached version or fetch from network
        return response || fetch(event.request);
      })
  );
});

// Activate event
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      // Take control of all clients immediately
      return self.clients.claim();
    })
  );
  
  // Notify clients about the update
  self.clients.matchAll().then((clients) => {
    clients.forEach((client) => {
      client.postMessage({
        type: 'APP_UPDATED',
        message: 'App has been updated automatically'
      });
    });
  });
});

// Background sync for notifications
self.addEventListener('sync', (event) => {
  if (event.tag === 'meditation-complete') {
    event.waitUntil(
      self.registration.showNotification('Meditation Complete', {
        body: 'Your meditation session has finished.',
        icon: '/favicon.ico',
        badge: '/favicon.ico',
        tag: 'meditation-timer',
        requireInteraction: true
      })
    );
  }
});
