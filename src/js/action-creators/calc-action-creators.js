// @flow

import * as Redux from 'redux';

import type {CalcAction} from '../actions/calc-actions';
import type {ButtonId} from '../model/button-id';
import type {RootState} from '../reducer/root-reducer';

export function pushButton(buttonId: ButtonId): any {
	return (dispatch: Redux.Dispatch<CalcAction>) => {
		dispatch({
			expanded: false,
			type: 'CALC_UPDATE_MENU_EXPANDED',
		});
		dispatch({
			buttonId: buttonId,
			type: 'CALC_PUSH_BUTTON',
		});
	};
}

export function toggleMenu(): any {
	return (dispatch: Redux.Dispatch<CalcAction>, getState: () => RootState) => {
		const state = getState().calc;

		dispatch({
			expanded: !state.menuExpanded,
			type: 'CALC_UPDATE_MENU_EXPANDED',
		});
	};
}

export function selectMenu(itemId: string): any {
	return (dispatch: Redux.Dispatch<CalcAction>, getState: () => RootState) => {
		dispatch({
			expanded: false,
			type: 'CALC_UPDATE_MENU_EXPANDED',
		});
	};
}
