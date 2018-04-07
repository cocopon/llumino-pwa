// @flow

import * as Redux from 'redux';

import CalculatorReducer from './calc-reducer';
import CommonReducer from './common-reducer';

import type {CalcState} from './calc-reducer';
import type {CommonState} from './common-reducer';

export type RootState = {
	calc: CalcState,
	common: CommonState,
};

export default Redux.combineReducers({
	calc: CalculatorReducer,
	common: CommonReducer,
});
