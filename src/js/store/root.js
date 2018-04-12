// @flow

import * as Redux from 'redux';

import StatePersistor from '../misc/state-persistor';
import {
	CalcReducer,
	CalcStatePersistor,
} from './calc';
import {
	CommonReducer,
	CommonStatePersistor,
} from './common';
import {
	SettingReducer,
	SettingStatePersistor,
} from './setting';

import type {CalcState} from './calc';
import type {CommonState} from './common';
import type {SettingState} from './setting';

export type RootState = {
	calc: CalcState,
	common: CommonState,
	setting: SettingState,
};

export const RootReducer = Redux.combineReducers({
	calc: CalcReducer,
	common: CommonReducer,
	setting: SettingReducer,
});

export const RootStatePersistors: StatePersistor<any>[] = [
	CalcStatePersistor,
	CommonStatePersistor,
	SettingStatePersistor,
];
