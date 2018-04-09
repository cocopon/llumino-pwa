// @flow

import * as ReduxActions from 'redux-actions';

import FlowUtil from '../misc/flow-util';
import Calculator from '../model/calculator/calculator';

import type {
	CalcPushButtonAction,
	CalcShakeDisplayAction,
	CalcUpdateMenuExpandedAction,
} from '../actions/calc-actions';

export type CalcState = {
	calculator: Calculator,
	menuExpanded: boolean,
	shakeCount: number,
};

const INITIAL_STATE: CalcState = {
	calculator: new Calculator(),
	menuExpanded: false,
	shakeCount: 0,
};

export default ReduxActions.handleActions({
	CALC_PUSH_BUTTON(state, action: CalcPushButtonAction) {
		state.calculator.pushButton(action.buttonId);
		return FlowUtil.updateState(state, {
			calculator: state.calculator,
		});
	},

	CALC_UPDATE_MENU_EXPANDED(state, action: CalcUpdateMenuExpandedAction) {
		return FlowUtil.updateState(state, {
			menuExpanded: action.expanded,
		});
	},

	CALC_SHAKE_DISPLAY(state, action: CalcShakeDisplayAction) {
		return FlowUtil.updateState(state, {
			shakeCount: state.shakeCount + 1,
		});
	},
}, INITIAL_STATE);
