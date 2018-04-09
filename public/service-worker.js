const CACHE_NAME = 'llumino-pwa-v1';
const FILES_TO_CACHE = [
	'./',
	'./assets/css/bundle.css',
	'./assets/js/bundle.js',
];

self.addEventListener('install', (event) => {
	event.waitUntil(
		caches.open(CACHE_NAME).then((cache) => {
			return cache.addAll(FILES_TO_CACHE);
		})
	);
});

self.addEventListener('fetch', (event) => {
	event.respondWith(
		caches.match(event.request).then((res) => {
			return res ?
				res :
				fetch(event.request);
		})
	);
});
