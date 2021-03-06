// @flow

import type {ButtonId} from '../model/button-id';

export type CalcPushButtonAction = {
	buttonId: ButtonId,
	type: 'CALC_PUSH_BUTTON',
};

export type CalcUpdateMenuExpandedAction = {
	expanded: boolean,
	type: 'CALC_UPDATE_MENU_EXPANDED',
};

export type CalcShakeDisplayAction = {
	type: 'CALC_SHAKE_DISPLAY',
};

export type CalcAction = CalcPushButtonAction |
	CalcShakeDisplayAction |
	CalcUpdateMenuExpandedAction;
