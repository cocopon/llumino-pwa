// @flow

import ButtonIdUtil from '../button-id';
import InputtingDigitsState from './inputting-digits-state';
import InputtingOperatorState from './inputting-operator-state';
import State from './state';

import type {ButtonId} from '../button-id';
import type {ButtonType} from '../button-type';

export default class ShowingAnswerState extends State {
	get displayNumber(): number {
		return this.calc_.answer;
	}

	get inefficientButtons(): ButtonId[] {
		return [
			'%',
			'=',
			'bs',
		];
	}

	pushButton(buttonId: ButtonId): State {
		const buttonType = ButtonIdUtil.getType(buttonId);
		const calc = this.calc_;

		if (buttonType === 'digit') {
			const nextState = new InputtingDigitsState(calc);
			return nextState.pushButton(buttonId);
		}

		if (buttonType === 'operator') {
			const nextState = new InputtingOperatorState(calc);
			return nextState.pushButton(buttonId);
		}

		if (buttonType === 'percent') {
			// Do nothing
			return this;
		}

		if (buttonType === 'delete') {
			// Do nothing
			return this;
		}

		if (buttonType === 'clear') {
			calc.clear({
				answer: true,
			});
			return this;
		}

		if (buttonType === 'invert') {
			calc.answer = -calc.answer;
			return this;
		}

		if (buttonType === 'equal') {
			// Do nothing
			return this;
		}

		throw new Error('not implemented');
	}
}
