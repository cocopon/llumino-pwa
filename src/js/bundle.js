// @flow

import React from 'react';
import ReactDom from 'react-dom';

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

	window.addEventListener('resize', () => {
		adjustFontSize();
	});
	adjustFontSize();
})();
