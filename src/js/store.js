// @flow

import * as Redux from 'redux';
import * as ReduxPersist from 'redux-persist';
import ReduxPersistStorage from 'redux-persist/lib/storage';
import ReduxPersistAutoMergeLevel2StateReconciler from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import ReduxThunk from 'redux-thunk';

import StoreSubscriber from './misc/store-subscriber';
import Theme from './model/theme';
import {
	RootReducer,
	RootStatePersistors,
} from './store/root';

import type {ThemeObject} from './model/theme';
import type {RootState} from './store/root';

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

function applyTheme(themeObj: ThemeObject, fancy: boolean) {
	const theme = Theme.fromObject(themeObj);
	applyCss('baseTheme', theme.generateBaseCss());
	applyCss('energyTheme', theme.generateEnergyCss(fancy));
}

function createTransform() {
	return ReduxPersist.createTransform(
		(inboundState, key) => {
			const persistor = RootStatePersistors.filter((persistor) => {
				return persistor.shouldHandle(key);
			})[0];

			const diff = persistor ?
				persistor.inbound(inboundState) :
				{};
			return Object.assign({}, inboundState, diff);
		},
		(outboundState, key) => {
			const persistor = RootStatePersistors.filter((persistor) => {
				return persistor.shouldHandle(key);
			})[0];

			const diff = persistor ?
				persistor.outbound(outboundState) :
				{};
			return Object.assign({}, outboundState, diff);
		},
	);
}

export default {
	create(): Redux.Store<*, *> {
		const persistedReducer = ReduxPersist.persistReducer({
			key: 'root',
			stateReconciler: ReduxPersistAutoMergeLevel2StateReconciler,
			storage: ReduxPersistStorage,
			transforms: [createTransform()],
		}, (RootReducer: any));
		const store = Redux.createStore(
			(persistedReducer: any),
			Redux.applyMiddleware(ReduxThunk),
		);

		const persistor = ReduxPersist.persistStore(store);
		persistor.persist();

		new StoreSubscriber(store, {
			selector(state: RootState): ThemeObject {
				return state.common.theme;
			},
			onChange(theme: ThemeObject) {
				const state = store.getState();
				applyTheme(theme, state.common.fancy);
			},
		});

		new StoreSubscriber(store, {
			selector(state: RootState): boolean {
				return state.common.fancy;
			},
			onChange(fancy: boolean) {
				const state = store.getState();
				applyTheme(state.common.theme, fancy);
			},
		});

		const state = store.getState();
		applyTheme(
			state.common.theme,
			state.common.fancy,
		);

		return store;
	},
}
