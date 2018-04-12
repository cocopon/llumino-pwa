// @flow

import * as Redux from 'redux';

import * as CommonActionCreators from './common-action-creators';

import type {CalcAction} from '../actions/calc-actions';
import type {CommonAction} from '../actions/common-actions';
import type {ButtonId} from '../model/button-id';
import type {RootState} from '../store/root';

export function pushButton(buttonId: ButtonId): any {
	return (dispatch: Redux.Dispatch<CalcAction>, getState: () => RootState) => {
		dispatch({
			expanded: false,
			type: 'CALC_UPDATE_MENU_EXPANDED',
		});

		const calc = getState().calc.calculator;
		if (calc.inefficientButtons.indexOf(buttonId) < 0) {
			dispatch({
				buttonId: buttonId,
				type: 'CALC_PUSH_BUTTON',
			});
		} else {
			dispatch({
				type: 'CALC_SHAKE_DISPLAY',
			});
		}
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
	return (dispatch: Redux.Dispatch<CalcAction | CommonAction>, getState: () => RootState) => {
		dispatch({
			expanded: false,
			type: 'CALC_UPDATE_MENU_EXPANDED',
		});

		if (itemId === 'settings') {
			dispatch(
				CommonActionCreators.changePage('setting'),
			);
		}
	};
}
