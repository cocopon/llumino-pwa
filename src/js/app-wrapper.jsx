// @flow

import Bugsnag from 'bugsnag-js';
import BugsnagReact from 'bugsnag-react';
import React from 'react';
import * as ReactRedux from 'react-redux';

import Config from '../../config.json';
import * as CommonActionCreators from './action-creators/common-action-creators';
import ErrorPage from './view/common/error-page';
import App from './app';
import Store from './store';

export default function() {
	const store = Store.create();

	// Check for update after few seconds
	setTimeout(() => {
		store.dispatch(
			CommonActionCreators.checkForUpdate(),
		);
	}, 4000);

	const bugsnag = Bugsnag(Config.bugsnagClientId);
	const ErrorBoundary = bugsnag.use(BugsnagReact(React));
	return (
		<ErrorBoundary
			FallbackComponent={ErrorPage}
		>
			<ReactRedux.Provider store={store}>
				<App/>
			</ReactRedux.Provider>
		</ErrorBoundary>
	);
}
