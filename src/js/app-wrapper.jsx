// @flow

import React from 'react';
import * as ReactRedux from 'react-redux';

import * as CommonActionCreators from './action-creators/common-action-creators';
import App from './app';
import Store from './store';

export default function() {
	const store = Store.create();

	store.dispatch(
		CommonActionCreators.checkForUpdate(),
	);

	return (
		<ReactRedux.Provider store={store}>
			<App/>
		</ReactRedux.Provider>
	);
}
