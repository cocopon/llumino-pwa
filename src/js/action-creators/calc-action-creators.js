// @flow

import * as Redux from 'redux';

import type {ButtonId} from '../logic/button-id';

export function pushButton(buttonId: ButtonId): any {
	return (dispatch: Redux.Dispatch<*>) => {
		console.log(['action', buttonId]);
	};
}
