// @flow

import Bugsnag from 'bugsnag-js';
import BugsnagReact from 'bugsnag-react';
import React from 'react';
import * as ReactRedux from 'react-redux';

import Config from '../../config.json';
import * as CommonActionCreators from './action-creators/common-action-creators';
import App from './app';
import Store from './store';

export default function() {
	const store = Store.create();

	store.dispatch(
		CommonActionCreators.checkForUpdate(),
	);

	const bugsnag = Bugsnag(Config.bugsnagClientId);
	const ErrorBoundary = bugsnag.use(BugsnagReact(React));
	return (
		<ErrorBoundary>
			<ReactRedux.Provider store={store}>
				<App/>
			</ReactRedux.Provider>
		</ErrorBoundary>
	);
}
