// @flow

import Theme from '../model/theme';

import type {CommonAction} from '../actions/common-actions';
import type {PageId} from '../model/page-id';

export function changePage(pageId: PageId): CommonAction {
	return {
		pageId,
		type: 'COMMON_CHANGE_PAGE',
	};
}

export function changeTheme(theme: Theme): CommonAction {
	return {
		theme,
		type: 'COMMON_CHANGE_THEME',
	};
}
