// @flow

declare var gtag: any;

const GA = {
	setUp(trackingId: ?string) {
		if (!trackingId) {
			return;
		}

		gtag('js', new Date());
		gtag('config', trackingId);

		const elem = document.createElement('script');
		elem.async = true;
		elem.src = `https://www.googletagmanager.com/gtag/js?id=${trackingId}`;
		if (!document.head) {
			return;
		}
		document.head.appendChild(elem);
	},

	sendEvent(action: string, value: ?string) {
		gtag('event', action, {
			value,
		});
	}
};

export default GA;
