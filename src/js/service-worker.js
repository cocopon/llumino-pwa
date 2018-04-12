const CACHE_NAME = 'llumino-pwa-v1';
const FILES_TO_CACHE = [
	'./',
	'./assets/css/bundle.css',
	'./assets/js/bundle.js',
];

self.addEventListener('install', (ev) => {
	ev.waitUntil(
		caches.open(CACHE_NAME).then((cache) => {
			return cache.addAll(FILES_TO_CACHE);
		})
	);
});

self.addEventListener('fetch', (ev) => {
	ev.respondWith(
		caches.open(CACHE_NAME).then((cache) => {
			return cache.match(ev.request).then((res) => {
				if (res) {
					// TODO: Remove
					console.log(`cache found: ${res.url}`);
				}

				// Update cache (will be loaded at next launch)
				const f = fetch(ev.request).then((res) => {
					// TODO: Remove
					console.log(`cache updated: ${res.url}`);

					cache.put(ev.request, res.clone());
					return res;
				});

				return res || f;
			});
		})
	);
});
