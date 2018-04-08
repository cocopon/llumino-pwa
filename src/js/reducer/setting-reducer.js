// @flow

import * as ReduxActions from 'redux-actions';

import FlowUtil from '../misc/flow-util';

import type {
	SettingChangeTabAction,
} from '../actions/setting-actions';
	
export type SettingState = {
	tabId: string,
};

const INITIAL_STATE: SettingState = {
	tabId: 'theme',
};

export default ReduxActions.handleActions({
	SETTING_CHANGE_TAB(state, action: SettingChangeTabAction) {
		return FlowUtil.updateState(state, {
			tabId: action.pageId,
		});
	},
}, INITIAL_STATE);
