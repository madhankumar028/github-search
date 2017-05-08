var urlsToCache = [
    '/index.html',
    '/server.js',
    '/assets/main.css',
    '/assets/loader.gif'
];

this.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open('github-search')
            .then( (cache) => {
                return cache.addAll(urlsToCache);
            })
    );
});

this.addEventListener('activate', (event) => {
    console.log('service worker is activated');
});

this.addEventListener('fetch', (event) => {    
    event.respondWith(
        caches.match(event.request)
            .then( (cachedResponse) => {
                if (cachedResponse) {
                    console.log(cachedResponse);                    
                    return cachedResponse;
                }
                return fetch(event.request);
            })
    );
});
