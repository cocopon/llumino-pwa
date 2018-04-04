// @flow

import * as Redux from 'redux';

import type {CalcAction} from '../actions/calc-actions';
import type {ButtonId} from '../model/button-id';

export function pushButton(buttonId: ButtonId): any {
	return (dispatch: Redux.Dispatch<CalcAction>) => {
		dispatch({
			buttonId: buttonId,
			type: 'CALC_PUSH_BUTTON',
		});
	};
}
