const currentCacheName = 'v1';
const cacheAssets = [
    'index.html',
    'about.html',
    'style.css',
    'main.js'
]

// Call Install Event
self.addEventListener('install', (e) => {
    console.log('Serice Worker: Installed');
    
    e.waitUntil(
        caches
            .open(currentCacheName)
            .then(cache => {
                console.log('Service Worker: Caching Files...');
                cache.addAll(cacheAssets)
            })
            .then(() => self.skipWaiting())
            .catch(err => console.log('Service Worker error while caching: ', err))
    )
})

// Call Activate Event
self.addEventListener('activate', (e) => {
    console.log('Serice Worker: Activated');
    // Remove unwanted caches
    e.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if(cache !== currentCacheName){
                        console.log('Service Worker: Clearing old cache...');
                        return caches.delete(cache);
                    }
                })
            )
        })
    )
})

// Call Fetch Event
self.addEventListener('fetch', e => {
    console.log('Service Worker: Fetching...');
    e.respondWith(
        fetch(e.request)
        .catch(() => caches.match(e.request))
    )
})