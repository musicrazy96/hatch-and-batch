// Hatch & Batch Service Worker
// ⚠️ Update CACHE_VERSION setiap kali deploy baru!
const CACHE_VERSION = 'v9.1-' + '20250529';
const CACHE_NAME    = 'hatch-batch-' + CACHE_VERSION;

const STATIC_ASSETS = [
  '/hatch-and-batch/',
  '/hatch-and-batch/index.html',
  'https://fonts.googleapis.com/css2?family=Fredoka:wght@400;500;600;700&family=Nunito:wght@400;500;600;700;800&display=swap',
];

// ── INSTALL: cache static assets ──
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(STATIC_ASSETS).catch(() => {}))
      .then(() => self.skipWaiting()) // activate immediately
  );
});

// ── ACTIVATE: delete old caches ──
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys
          .filter(k => k.startsWith('hatch-batch-') && k !== CACHE_NAME)
          .map(k => {
            console.log('[SW] Deleting old cache:', k);
            return caches.delete(k);
          })
      ))
      .then(() => self.clients.claim()) // take control immediately
  );
});

// ── FETCH: network first for HTML, cache first for assets ──
self.addEventListener('fetch', event => {
  const url = event.request.url;

  // Always network for API calls
  if (url.includes('supabase.co') || url.includes('anthropic.com')) return;

  // Network first for HTML pages (always get latest)
  if (event.request.mode === 'navigate' ||
      url.endsWith('.html') || url.endsWith('/')) {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          if (response.ok) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
          }
          return response;
        })
        .catch(() => caches.match(event.request))
    );
    return;
  }

  // Cache first for fonts + static assets
  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;
      return fetch(event.request).then(response => {
        if (response.ok && event.request.method === 'GET') {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
        }
        return response;
      }).catch(() => new Response('Offline', { status: 503 }));
    })
  );
});

// ── MESSAGE: force update from app ──
self.addEventListener('message', event => {
  if (event.data === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
