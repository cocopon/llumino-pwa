// @flow

import * as Redux from 'redux';

import Version from '../app/version';
import Theme from '../model/theme';

import type {CommonAction} from '../actions/common-actions';
import type {PageId} from '../model/page-id';
import type {RootState} from '../store/root';

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

export function checkForUpdate(): any {
	return (dispatch: Redux.Dispatch<CommonAction>, getState: () => RootState) => {
		Version.checkForUpdate().then((outdated) => {
			Version.addOnCompleteUpdateListener((data) => {
				dispatch({
					outdated,
					type: 'COMMON_UPDATE_OUTDATED',
				});
			});
			Version.requestUpdatingCache();
		});
	};
}

export function reload(): any {
	return (_dispatch: Redux.Dispatch<CommonAction>) => {
		location.reload();
	};
}
