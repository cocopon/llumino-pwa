// @flow

import * as Redux from 'redux';

import CalculatorReducer from './calc-reducer';
import CommonReducer from './common-reducer';
import SettingReducer from './setting-reducer';

import type {CalcState} from './calc-reducer';
import type {CommonState} from './common-reducer';
import type {SettingState} from './setting-reducer';

export type RootState = {
	calc: CalcState,
	common: CommonState,
	setting: SettingState,
};

export default Redux.combineReducers({
	calc: CalculatorReducer,
	common: CommonReducer,
	setting: SettingReducer,
});
