const CACHE_NAME = 'meu-pwa-cache-v1';
const RESOURCES_TO_PRECACHE = [
    '/',
    'index.html',
    'styles.css',
    'icon-192x192.png'
];

self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function(cache) {
                return cache.addAll(RESOURCES_TO_PRECACHE);
            })
    );
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request)
            .then(function(response) {
                return response || fetch(event.request);
            })
    );
});
