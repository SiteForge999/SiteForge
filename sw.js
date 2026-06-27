const CACHE_NAME = 'siteforge-cache-v1';
const ASSETS = [
  './',
  './index.html',
  './style.css',
  './app.js',
  './supabase.js',
  './manifest.json',
  './logo-icon.jpg',
  './hero-mockup.jpg'
];

// Install Event - cache assets
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[Service Worker] Caching files');
      return cache.addAll(ASSETS);
    }).then(() => self.skipWaiting())
  );
});

// Activate Event - clean up old caches
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            console.log('[Service Worker] Clearing old cache', key);
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch Event - cache falling back to network
self.addEventListener('fetch', (e) => {
  // Only handle local HTTP/S requests, bypass chrome-extension:// etc.
  if (!e.request.url.startsWith(self.location.origin)) {
    return;
  }
  
  e.respondWith(
    caches.match(e.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(e.request).then((networkResponse) => {
        // Cache newly fetched local pages dynamically if required
        return networkResponse;
      });
    })
  );
});
