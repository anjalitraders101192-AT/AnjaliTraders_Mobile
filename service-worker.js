const CACHE_NAME = 'anjali-traders-v2';
const ASSETS = [
  './AnjaliTraders_Mobile_v3.html',
  './manifest.json'
];
self.addEventListener('install', function(e) {
  e.waitUntil(caches.open(CACHE_NAME).then(function(cache) { return cache.addAll(ASSETS); }));
  self.skipWaiting();
});
self.addEventListener('activate', function(e) {
  e.waitUntil(caches.keys().then(function(keys) {
    return Promise.all(keys.filter(function(k){ return k!==CACHE_NAME; }).map(function(k){ return caches.delete(k); }));
  }));
  self.clients.claim();
});
self.addEventListener('fetch', function(e) {
  if(e.request.url.includes('firestore.googleapis.com')||e.request.url.includes('firebase')||
     e.request.url.includes('googleapis.com')||e.request.url.includes('gstatic.com')||
     e.request.url.includes('fonts.google')||e.request.url.includes('open-meteo')||
     e.request.url.includes('ipapi.co')) { return; }
  e.respondWith(caches.match(e.request).then(function(cached){ return cached||fetch(e.request); }));
});
self.addEventListener('push', function(e) {
  const d=e.data?e.data.json():{title:'Anjali Traders',body:'New update'};
  e.waitUntil(self.registration.showNotification(d.title||'Anjali Traders IMS',{
    body:d.body||'',icon:'./logo.png',badge:'./logo.png'
  }));
});
