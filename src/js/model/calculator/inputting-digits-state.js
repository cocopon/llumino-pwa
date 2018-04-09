// @flow

import ButtonIdUtil from '../button-id';
import InputtingOperatorState from './inputting-operator-state';
import ShowingAnswerState from './showing-answer.state';
import State from './state';

import type {ButtonId, OperatorButtonId} from '../button-id';
import type {ButtonType} from '../button-type';

export default class InputtingDigitsState extends State {
	get displayNumber(): number {
		return ButtonIdUtil.buildNumber(this.calc_.inputBuffers_);
	}

	get inefficientButtons(): ButtonId[] {
		const buttonIds: ButtonId[] = [];
		if (this.calc_.inputBuffers_.length === 0) {
			buttonIds.push('bs');
		}
		if (this.calc_.inputBuffers_.length >= this.calc_.maxInputBufferCount_) {
			buttonIds.push(
				'0', '1', '2', '3', '4',
				'5', '6', '7', '8', '9',
				'.',
			);
		}
		return buttonIds;
	}

	operate_() {
		const calc = this.calc_;
		const n1 = calc.answer;
		const n2 = ButtonIdUtil.buildNumber(calc.inputBuffers_);

		if (!calc.operatorBuffer_) {
			calc.answer = n2;
			return;
		}
		const operatorId = calc.operatorBuffer_;
		calc.clear({
			operatorBuffer: true,
		});

		const OPERATORS: {[OperatorButtonId]: (number, number) => number} = {
			'+': (a, b) => (a + b),
			'-': (a, b) => (a - b),
			'*': (a, b) => (a * b),
			'/': (a, b) => (a / b),
		};
		const operator = OPERATORS[operatorId];
		if (!operator) {
			throw new Error('invalid operator');
		}

		calc.answer = operator(n1, n2);
	}

	operatePercent_() {
		const calc = this.calc_;
		const n1 = calc.answer;
		const n2 = ButtonIdUtil.buildNumber(calc.inputBuffers_);

		if (!calc.operatorBuffer_) {
			calc.answer = n2 * 0.01;
			return;
		}
		const operatorId = calc.operatorBuffer_;
		calc.clear({
			operatorBuffer: true,
		});

		const OPERATORS: {[OperatorButtonId]: (number, number) => number} = {
			'+': (a, b) => (a + (a * b * 0.01)),
			'-': (a, b) => (a - (a * b * 0.01)),
			'*': (a, b) => (a * (b * 0.01)),
			'/': (a, b) => (a / (b * 0.01)),
		};
		const operator = OPERATORS[operatorId];
		if (!operator) {
			throw new Error('invalid operator');
		}

		calc.answer = operator(n1, n2);
	}

	pushButton(buttonId: ButtonId): State {
		const buttonType = ButtonIdUtil.getType(buttonId);
		const calc = this.calc_;

		if (buttonType === 'digit') {
			if (buttonId === '.') {
				if (calc.inputBuffers_.length === 0) {
					calc.inputBuffers_.push(
						'0',
						buttonId,
					);
					return this;
				}
				if (calc.inputBuffers_.indexOf('.') >= 0) {
					// Ignore duplicated dots (e.g. 3.14.16)
					return this;
				}
			}
			calc.inputBuffers_.push(buttonId);
			return this;
		}

		if (buttonType === 'operator') {
			this.operate_();
			const nextState = new InputtingOperatorState(calc);
			return nextState.pushButton(buttonId);
		}

		if (buttonType === 'percent') {
			this.operatePercent_();
			return new ShowingAnswerState(calc);
		}

		if (buttonType === 'delete') {
			if (calc.inputBuffers_.length > 0) {
				calc.inputBuffers_.pop();
			}
			return this;
		}

		if (buttonType === 'invert') {
			this.operate_();
			calc.answer = -calc.answer;
			return new ShowingAnswerState(calc);
		}

		if (buttonType === 'clear') {
			if (calc.inputBuffers_.length === 0) {
				calc.clear({
					operatorBuffer: true,
				});
				const nextState = new ShowingAnswerState(calc);
				return nextState.pushButton(buttonId);
			}
			calc.clear({
				inputBuffers: true,
			});
			return this;
		}

		if (buttonType === 'equal') {
			this.operate_();
			return new ShowingAnswerState(calc);
		}

		throw new Error('not implemented');
	}
}
