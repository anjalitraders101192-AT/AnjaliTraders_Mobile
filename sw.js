const CACHE = 'anjali-v1';
self.addEventListener('install', e => e.waitUntil(caches.open(CACHE).then(c => c.addAll(['./', './AnjaliTraders_Mobile_v3.html']))));
self.addEventListener('fetch', e => e.respondWith(caches.match(e.request).then(r => r || fetch(e.request))));
self.addEventListener('push', e => {
  const d = e.data ? e.data.json() : {title:'Anjali Traders',body:'New update'};
  e.waitUntil(self.registration.showNotification(d.title||'Anjali Traders IMS',{body:d.body||'',icon:'./logo.png',badge:'./logo.png'}));
});
