// @flow

import ReactDom from 'react-dom';

import Config from '../../config.json';
import GoogleAnalytics from './misc/google-analytics';
import AppWrapper from './app-wrapper';

function adjustFontSize() {
	const w = window.innerWidth;
	const h = window.innerHeight;
	const fontSize = Math.min(Math.max(
		(w < h) ?
			w * 0.04 :
			h * 0.03,
		12), 18,
	);
	if (document.documentElement) {
		document.documentElement.style.fontSize = `${fontSize}px`;
	}
}

(() => {
	const containerElem = document.getElementById('appContainer');
	if (!containerElem) {
		return;
	}
	ReactDom.render(
		AppWrapper(),
		containerElem,
	);

	GoogleAnalytics.setUp(Config.gaTrackingId);

	window.addEventListener('resize', () => {
		adjustFontSize();
	});
	adjustFontSize();
})();
