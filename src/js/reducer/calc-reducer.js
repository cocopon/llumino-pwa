// @flow

import * as ReduxActions from 'redux-actions';

import FlowUtil from '../misc/flow-util';
import Calculator from '../model/calculator';

import type {
	CalcPushButtonAction,
	CalcUpdateMenuExpandedAction,
} from '../actions/calc-actions';

export type CalcState = {
	calculator: Calculator,
	menuExpanded: boolean,
};

const INITIAL_STATE: CalcState = {
	calculator: new Calculator(),
	menuExpanded: false,
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
}, INITIAL_STATE);
