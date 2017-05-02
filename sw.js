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
