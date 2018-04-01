// @flow

import React from 'react';
import ReactDom from 'react-dom';

import AppWrapper from './app-wrapper';

(() => {
	const containerElem = document.getElementById('appContainer');
	if (!containerElem) {
		return;
	}
	ReactDom.render(
		React.createElement(AppWrapper),
		containerElem,
	);
})();
