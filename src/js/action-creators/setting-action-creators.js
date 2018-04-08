// @flow

import * as CommonActionCreators from './common-action-creators';
import * as SettingActionCreators from './setting-action-creators';

import type {CommonAction} from '../actions/common-actions';
import type {SettingAction} from '../actions/setting-actions';

export function closePage(): CommonAction {
	return CommonActionCreators.changePage('calc');
}

export function changeTab(itemId: string): SettingAction {
	return {
		pageId: itemId,
		type: 'SETTING_CHANGE_TAB',
	};
}
