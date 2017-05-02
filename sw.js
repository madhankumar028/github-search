this.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open('github-search')
            .then(function(cache) {
                return cache.addAll([
                    '/index.html',
                    '/server.js',
                    '/assets/main.css',
                    '/assets/loader.gif'
                ]);
            })
    );
});

console.log(this);

this.addEventListener('fetch', function(event) {
    console.log(event.request.url);
    event.respondWith(
        caches.match(event.request)
            .then(function(response) {
                return response || fetch(event.request);
            })
    );
});
