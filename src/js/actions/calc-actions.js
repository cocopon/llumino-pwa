// @flow

import type {ButtonId} from '../logic/button-id';

export type CalcPushButtonAction = {
	buttonId: ButtonId,
	type: 'CALC_PUSH_BUTTON',
};

export type CalcAction = CalcPushButtonAction;
