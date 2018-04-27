// @flow

import * as ReduxActions from 'redux-actions';

import FlowUtil from '../misc/flow-util';
import StatePersistor from '../misc/state-persistor';
import Calculator from '../model/calculator/calculator';

import type {
	CalcPushButtonAction,
	CalcShakeDisplayAction,
	CalcUpdateMenuExpandedAction,
} from '../actions/calc-actions';
import type {CalculatorObject} from '../model/calculator/calculator';

export type CalcState = {
	calculator: CalculatorObject,
	menuExpanded: boolean,
	shakeCount: number,
};

const INITIAL_STATE: CalcState = {
	calculator: Calculator.initialState(),
	menuExpanded: false,
	shakeCount: 0,
};

export const CalcReducer = ReduxActions.handleActions({
	CALC_PUSH_BUTTON(state, action: CalcPushButtonAction) {
		const calc = Calculator.fromObject(state.calculator);
		calc.pushButton(action.buttonId);

		return FlowUtil.updateState(state, {
			calculator: calc.toObject(),
		});
	},

	CALC_UPDATE_MENU_EXPANDED(state, action: CalcUpdateMenuExpandedAction) {
		return FlowUtil.updateState(state, {
			menuExpanded: action.expanded,
		});
	},

	CALC_SHAKE_DISPLAY(state, _action: CalcShakeDisplayAction) {
		return FlowUtil.updateState(state, {
			shakeCount: state.shakeCount + 1,
		});
	},
}, INITIAL_STATE);

export const CalcStatePersistor: StatePersistor<CalcState> = new StatePersistor(
	'calc',
	(_state) => {
		return {};
	},
	(_obj) => {
		return {};
	},
);
