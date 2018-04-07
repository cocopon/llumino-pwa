// @flow

import * as ReduxActions from 'redux-actions';

import FlowUtil from '../misc/flow-util';

import type {
	CommonChangePageAction,
} from '../actions/common-actions';
import type {PageId} from '../model/page-id';
	
export type CommonState = {
	pageId: PageId,
};

const INITIAL_STATE: CommonState = {
	pageId: 'calc',
};

export default ReduxActions.handleActions({
	COMMON_CHANGE_PAGE(state, action: CommonChangePageAction) {
		return FlowUtil.updateState(state, {
			pageId: action.pageId,
		});
	},
}, INITIAL_STATE);
