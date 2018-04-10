// @flow

import * as Redux from 'redux';
import ReduxThunk from 'redux-thunk';

import StoreSubscriber from './misc/store-subscriber';
import Theme from './model/theme';
import RootReducer from './reducer/root-reducer';

import type {RootState} from './reducer/root-reducer';

function applyCss(elementId: string, css: string) {
	let styleElem = document.getElementById(elementId);
	if (!styleElem) {
		styleElem = document.createElement('style');
		styleElem.id = elementId;

		if (document.head) {
			document.head.appendChild(styleElem);
		}
	}

	styleElem.textContent = css;
}

function applyThemeBase(theme: Theme) {
	applyCss('baseTheme', theme.generateBaseCss());
}

function applyThemeEnergy(theme: Theme) {
	applyCss('energyTheme', theme.generateEnergyCss());
}

function applyTheme(theme: Theme) {
	applyThemeBase(theme);
	applyThemeEnergy(theme);
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
