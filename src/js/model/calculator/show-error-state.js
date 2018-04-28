// @flow

import ButtonIdUtil from '../button-id';
import ShowAnswerState from './show-answer-state';
import State from './state';

import type {ButtonId} from '../button-id';

export default class ShowErrorState extends State {
	get inefficientButtons(): ButtonId[] {
		return [
			'%',
			'+', '-', '*', '/',
			'.',
			'0', '1', '2', '3', '4',
			'5', '6', '7', '8', '9',
			'=',
			'bs',
			'inv',
		];
	}

	pushButton(buttonId: ButtonId): State {
		const buttonType = ButtonIdUtil.getType(buttonId);
		const calc = this.calc_;

		if (buttonType === 'clear') {
			const newState = new ShowAnswerState(calc);
			return newState.pushButton(buttonId);
		}

		return this;
	}
}
