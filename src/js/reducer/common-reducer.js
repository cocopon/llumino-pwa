// @flow

import * as ReduxActions from 'redux-actions';

import FlowUtil from '../misc/flow-util';
import Theme from '../model/theme';

import type {
	CommonChangePageAction,
	CommonChangeThemeAction,
} from '../actions/common-actions';
import type {PageId} from '../model/page-id';
	
export type CommonState = {
	pageId: PageId,
	theme: Theme,
};

const INITIAL_STATE: CommonState = {
	pageId: 'calc',
	theme: Theme.createDefault(),
};

export default ReduxActions.handleActions({
	COMMON_CHANGE_PAGE(state, action: CommonChangePageAction) {
		return FlowUtil.updateState(state, {
			pageId: action.pageId,
		});
	},

	COMMON_CHANGE_THEME(state, action: CommonChangeThemeAction) {
		return FlowUtil.updateState(state, {
			theme: action.theme,
		});
	},
}, INITIAL_STATE);
