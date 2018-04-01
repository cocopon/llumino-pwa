// @flow

import React from 'react';
import ReactDom from 'react-dom';

import App from './app';

(() => {
	const containerElem = document.getElementById('appContainer');
	if (!containerElem) {
		return;
	}
	ReactDom.render(
		React.createElement(App),
		containerElem,
	);
})();
