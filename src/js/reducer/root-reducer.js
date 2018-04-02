// @flow

import * as Redux from 'redux';

import CalculatorReducer from './calc-reducer';

import type {CalcState} from './calc-reducer';

export type RootState = {
	calc: CalcState,
};

export default Redux.combineReducers({
	calc: CalculatorReducer,
});
