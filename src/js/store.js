// @flow

import * as Redux from 'redux';
import ReduxThunk from 'redux-thunk';

import RootReducer from './reducer/root-reducer';

export default {
	create(): Redux.Store<*> {
		const store = Redux.createStore(
			RootReducer,
			Redux.applyMiddleware(ReduxThunk),
		);
		return store;
	},
}
