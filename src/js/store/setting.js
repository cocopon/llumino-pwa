// @flow

import * as ReduxActions from 'redux-actions';

import FlowUtil from '../misc/flow-util';
import StatePersistor from '../misc/state-persistor';

import type {
	SettingChangeTabAction,
} from '../actions/setting-actions';
	
export type SettingState = {
	tabId: string,
};

const INITIAL_STATE: SettingState = {
	tabId: 'theme',
};

export const SettingReducer = ReduxActions.handleActions({
	SETTING_CHANGE_TAB(state, action: SettingChangeTabAction) {
		return FlowUtil.updateState(state, {
			tabId: action.pageId,
		});
	},
}, INITIAL_STATE);

export const SettingStatePersistor: StatePersistor<SettingState> = new StatePersistor(
	'setting',
);
