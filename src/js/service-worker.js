const CACHE_NAME = 'llumino-pwa-v1';
const FILES_TO_CACHE = [
	'./',
	'./assets/css/bundle.css',
	'./assets/js/bundle.js',
];

function updateCache() {
	return caches.open(CACHE_NAME).then((cache) => {
		return cache.addAll(FILES_TO_CACHE);
	});
}

self.addEventListener('install', (ev) => {
	ev.waitUntil(updateCache());
});

self.addEventListener('fetch', (ev) => {
	ev.respondWith(
		caches.open(CACHE_NAME).then((cache) => {
			return cache.match(ev.request).then((res) => {
				return res || fetch(ev.request);
			});
		})
	);
});

self.addEventListener('message', (ev) => {
	const message = ev.data;

	if (message.type === 'UPDATE_CACHE') {
		updateCache().then(() => {
			self.clients.matchAll().then((clients) => {
				clients.forEach((client) => {
					client.postMessage({
						type: 'COMPLETE_UPDATING_CACHE',
					});
				});
			});
		});
	}
});
