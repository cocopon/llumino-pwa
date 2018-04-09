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

		if (buttonType === 'digit') {
			const nextState = new InputtingDigitsState(this.calc_);
			return nextState.pushButton(buttonId);
		}

		if (buttonType === 'operator') {
			const nextState = new InputtingOperatorState(this.calc_);
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
			this.calc_.clear({
				answer: true,
			});
			return this;
		}

		if (buttonType === 'equal') {
			// Do nothing
			return this;
		}

		throw new Error('not implemented');
	}
}
