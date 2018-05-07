// @flow

import * as ReduxActions from 'redux-actions';

import FlowUtil from '../misc/flow-util';
import StatePersistor from '../misc/state-persistor';
import Theme from '../model/theme';

import type {
	CommonChangePageAction,
	CommonChangeThemeAction,
	CommonUpdateFancyAction,
	CommonUpdateOutdatedAction,
} from '../actions/common-actions';
import type {PageId} from '../model/page-id';
import type {ThemeObject} from '../model/theme';
	
export type CommonState = {
	fancy: boolean,
	outdated: boolean,
	pageId: PageId,
	theme: ThemeObject,
};

const INITIAL_STATE: CommonState = {
	fancy: false,
	outdated: false,
	pageId: 'calc',
	theme: Theme.defaultObject(),
};

export const CommonReducer = ReduxActions.handleActions({
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

	COMMON_UPDATE_OUTDATED(state, action: CommonUpdateOutdatedAction) {
		return FlowUtil.updateState(state, {
			outdated: action.outdated,
		});
	},

	COMMON_UPDATE_FANCY(state, action: CommonUpdateFancyAction) {
		return FlowUtil.updateState(state, {
			fancy: action.fancy,
		});
	},
}, INITIAL_STATE);

export const CommonStatePersistor: StatePersistor<CommonState> = new StatePersistor(
	'common',
	(_state) => {
		return {};
	},
	(_obj) => {
		return {
			outdated: false,
		};
	},
);
