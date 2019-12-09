console.log('Into Service Worker');
var CACHE_NAME = 'my-site-cache-v1.5';
const FILES_TO_CACHE = [
  'main.html'
    ,'../../templates/jquery.slim.min.js'
    ,'../../templates/popper.min.js',
    '../../templates/bootstrap.min.js',
    '../../templates/bootstrap.min.css',
    '../../templates/styles.css',
];


self.addEventListener('install', function(event) {
    event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(FILES_TO_CACHE); 
        })
);
});
self.addEventListener('activate', function(event) {
  console.log('Service Worker activating.');  
    event.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(keyList.map((key) => {
        if (key !== CACHE_NAME) {
          return caches.delete(key);
        }
      }));
    })
);
});

self.addEventListener('fetch', (event) => {
event.respondWith(
    // Try the cache
    caches.match(event.request).then(function(response) {
      // Fall back to network
      return response || fetch(event.request);
    }).catch(function() {
      // If both fail, show a generic fallback:
      return caches.match('/offline.html');
      // However, in reality you'd have many different
      // fallbacks, depending on URL & headers.
      // Eg, a fallback silhouette image for avatars.
    })
  );
});
