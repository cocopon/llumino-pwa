// @flow

import Theme from '../model/theme';

import type {PageId} from '../model/page-id';

export type CommonChangePageAction = {
	pageId: PageId,
	type: 'COMMON_CHANGE_PAGE',
};

export type CommonChangeThemeAction = {
	theme: Theme,
	type: 'COMMON_CHANGE_THEME',
};

export type CommonUpdateOutdated = {
	outdated: boolean,
	type: 'COMMON_UPDATE_OUTDATED',
};

export type CommonAction = CommonChangePageAction |
	CommonChangeThemeAction |
	CommonUpdateOutdated;
