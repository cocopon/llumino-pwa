// @flow

import type {ButtonId} from '../model/button-id';

export type CalcPushButtonAction = {
	buttonId: ButtonId,
	type: 'CALC_PUSH_BUTTON',
};

export type CalcAction = CalcPushButtonAction;
