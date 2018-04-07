// @flow

import * as CommonActionCreators from './common-action-creators';

import type {CommonAction} from '../actions/common-actions';

export function closePage(): CommonAction {
	return CommonActionCreators.changePage('calc');
}

export function showSubpage(itemId: string) {
	// TODO: Implement
	console.log(itemId);
	return {
		type: '',
	};
}
