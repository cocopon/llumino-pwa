// @flow

import Constants from '../misc/constants';

export default {
	checkForUpdate(): Promise<boolean> {
		const cacheBuster = String((new Date()).getTime());
		return fetch(`assets/data/version?${cacheBuster}`).then((res) => {
			return res.text();
		}).then((latestVersion) => {
			const outdated = (Constants.version !== latestVersion);
			return outdated;
		});
	},

	requestUpdatingCache() {
		const sw = navigator.serviceWorker && navigator.serviceWorker.controller || null;
		if (!sw) {
			return;
		}

		sw.postMessage({
			type: 'UPDATE_CACHE',
		});
	},

	addOnCompleteUpdateListener(callback: () => void) {
		const sw = navigator.serviceWorker;
		if (!sw) {
			return;
		}

		sw.addEventListener('message', (ev) => {
			if (ev.data.type === 'COMPLETE_UPDATING_CACHE') {
				callback();
			}
		});
	},

	forceReload() {
		if (!navigator.serviceWorker) {
			location.reload(true);
			return;
		}

		// Clear caches and then reload
		navigator.serviceWorker.ready.then((reg) => {
			return reg.unregister();
		}).then(() => {
			location.reload(true);
		});
	},
}
