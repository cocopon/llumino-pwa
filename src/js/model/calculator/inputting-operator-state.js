// @flow

import ButtonIdUtil from '../button-id';
import InputtingDigitsState from './inputting-digits-state';
import ShowingAnswerState from './showing-answer.state';
import State from './state';

import type {ButtonId} from '../button-id';
import type {ButtonType} from '../button-type';

export default class InputtingOperatorState extends State {
	get displayNumber(): number {
		return this.calc_.answer_;
	}

	get inefficientButtons(): ButtonId[] {
		return [
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
			calc.operatorBuffer_ = (buttonId: any);
			return this;
		}

		if (buttonType === 'percent') {
			calc.answer = calc.answer * 0.01;
			return new ShowingAnswerState(calc);
		}

		if (buttonType === 'delete') {
			// Do nothing
			return this;
		}

		if (buttonType === 'clear') {
			calc.clear({
				answer: true,
				inputBuffers: true,
				operatorBuffer: true,
			});
			return new ShowingAnswerState(calc);
		}

		if (buttonType === 'invert') {
			calc.answer = -calc.answer;
			return new ShowingAnswerState(calc);
		}

		if (buttonType === 'equal') {
			calc.clear({
				inputBuffers: true,
				operatorBuffer: true,
			});
			return new ShowingAnswerState(calc);
		}

		throw new Error('not implemented');
	}
}

