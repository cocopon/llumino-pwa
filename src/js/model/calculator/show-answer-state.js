// @flow

import ButtonIdUtil from '../button-id';
import CalculatorError from './error';
import InputDigitsState from './input-digits-state';
import InputOperatorState from './input-operator-state';
import State from './state';

import type {ButtonId} from '../button-id';

export default class ShowAnswerState extends State {
	get inefficientButtons(): ButtonId[] {
		return [
			'=',
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
			const nextState = new InputOperatorState(calc);
			return nextState.pushButton(buttonId);
		}

		if (buttonType === 'percent') {
			calc.answer = calc.answer * 0.01;
			return this;
		}

		if (buttonType === 'delete') {
			// Do nothing
			return this;
		}

		if (buttonType === 'clear') {
			calc.clear({
				answer: true,
				error: true,
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

		throw new CalculatorError('notImplemented');
	}
}
