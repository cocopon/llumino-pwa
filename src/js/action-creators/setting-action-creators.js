// @flow

import * as Redux from 'redux';

import * as CommonActionCreators from './common-action-creators';

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

export function forceReload(): any {
	return (_dispatch: Redux.Dispatch<CommonAction>) => {
		location.reload(true);
	};
}

export function updateFancy(fancy: boolean): CommonAction {
	return {
		fancy,
		type: 'COMMON_UPDATE_FANCY',
	};
}
