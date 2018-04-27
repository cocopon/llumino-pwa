// @flow

import type {PageId} from '../model/page-id';
import type {ThemeObject} from '../model/theme';

export type CommonChangePageAction = {
	pageId: PageId,
	type: 'COMMON_CHANGE_PAGE',
};

export type CommonChangeThemeAction = {
	theme: ThemeObject,
	type: 'COMMON_CHANGE_THEME',
};

export type CommonUpdateOutdatedAction = {
	outdated: boolean,
	type: 'COMMON_UPDATE_OUTDATED',
};

export type CommonUpdateFancyAction = {
	fancy: boolean,
	type: 'COMMON_UPDATE_FANCY',
};

export type CommonAction = CommonChangePageAction |
	CommonChangeThemeAction |
	CommonUpdateOutdatedAction |
	CommonUpdateFancyAction;
