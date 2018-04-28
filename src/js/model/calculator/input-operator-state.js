// @flow

import ButtonIdUtil from '../button-id';
import CalculatorError from './error';
import InputDigitsState from './input-digits-state';
import ShowAnswerState from './show-answer-state';
import State from './state';

import type {ButtonId} from '../button-id';

export default class InputOperatorState extends State {
	get inefficientButtons(): ButtonId[] {
		return [
			'bs',
		];
	}

	pushButton(buttonId: ButtonId): State {
		const buttonType = ButtonIdUtil.getType(buttonId);
		const calc = this.calc_;

		if (buttonType === 'digit') {
			const nextState = new InputDigitsState(calc);
			return nextState.pushButton(buttonId);
		}

		if (buttonType === 'operator') {
			calc.operatorBuffer_ = (buttonId: any);
			return this;
		}

		if (buttonType === 'percent') {
			calc.answer = calc.answer * 0.01;
			return new ShowAnswerState(calc);
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
			return new ShowAnswerState(calc);
		}

		if (buttonType === 'invert') {
			calc.answer = -calc.answer;
			return new ShowAnswerState(calc);
		}

		if (buttonType === 'equal') {
			calc.clear({
				inputBuffers: true,
				operatorBuffer: true,
			});
			return new ShowAnswerState(calc);
		}

		throw new CalculatorError('notImplemented');
	}
}

