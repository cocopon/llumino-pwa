// @flow

import * as ReduxActions from 'redux-actions';

import Calculator from '../logic/calculator';
import FlowUtil from '../misc/flow-util';

import type {
	CalcPushButtonAction
} from '../actions/calc-actions';

export type CalcState = {
	calculator: Calculator,
};

const INITIAL_STATE: CalcState = {
	calculator: new Calculator(),
};

export default ReduxActions.handleActions({
	CALC_PUSH_BUTTON(state, action: CalcPushButtonAction) {
		state.calculator.pushButton(action.buttonId);
		return FlowUtil.updateState(state, {
			calculator: state.calculator,
		});
	},
}, INITIAL_STATE);
