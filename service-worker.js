const CACHE_NAME = 'anjali-traders-v1';
const ASSETS = [
  './AnjaliTraders_IMS_FIXED_4_.html',
  './manifest.json'
];

self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(ASSETS);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', function(e) {
  e.waitUntil(
    caches.keys().then(function(keys) {
      return Promise.all(
        keys.filter(function(k) { return k !== CACHE_NAME; })
            .map(function(k) { return caches.delete(k); })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', function(e) {
  // Firebase aur Google Fonts ke requests bypass karo — hamesha network se
  if (
    e.request.url.includes('firestore.googleapis.com') ||
    e.request.url.includes('firebase') ||
    e.request.url.includes('googleapis.com') ||
    e.request.url.includes('gstatic.com') ||
    e.request.url.includes('fonts.google')
  ) {
    return;
  }

  e.respondWith(
    caches.match(e.request).then(function(cached) {
      return cached || fetch(e.request);
    })
  );
});
