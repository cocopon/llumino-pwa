// @flow

import type {PageId} from '../model/page-id';

export type CommonChangePageAction = {
	pageId: PageId,
	type: 'COMMON_CHANGE_PAGE',
};

export type CommonAction = CommonChangePageAction;
