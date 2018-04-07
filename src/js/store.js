// @flow

import * as Redux from 'redux';
import ReduxThunk from 'redux-thunk';

import StoreSubscriber from './misc/store-subscriber';
import Theme from './model/theme';
import RootReducer from './reducer/root-reducer';

import type {RootState} from './reducer/root-reducer';

function applyTheme(theme: Theme) {
	let styleElem = document.getElementById('theme');
	if (!styleElem) {
		styleElem = document.createElement('style');
		styleElem.id = 'theme';

		if (document.head) {
			document.head.appendChild(styleElem);
		}
	}

	styleElem.textContent = theme.generateCss();
}

export default {
	create(): Redux.Store<*, *> {
		const store = Redux.createStore(
			(RootReducer: any),
			Redux.applyMiddleware(ReduxThunk),
		);

		new StoreSubscriber(store, {
			selector(state: RootState): Theme {
				return state.common.theme;
			},
			onChange(theme: Theme) {
				applyTheme(theme);
			},
		});
		applyTheme(store.getState().common.theme);

		return store;
	},
}
