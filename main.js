// Register SW ifd SW is supported
if(navigator.serviceWorker){
    window.addEventListener('load', () => {
        navigator.serviceWorker
        .register('sw-cached-site.js')
        .then(reg => console.log('Service Worker: Registered'))
        .catch(err => console.log('Service Worker: ', err));
    })
}