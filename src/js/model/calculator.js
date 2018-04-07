// @flow

import ButtonIdUtil from './button-id';

import type {ButtonId, OperatorButtonId} from './button-id';
import type {ButtonType} from './button-type';

function createNumberFromButtonIds(buttonIds: ButtonId[]): number {
	const text = buttonIds.reduce((text, buttonId) => {
		return `${text}${buttonId}`;
	}, '');
	return parseFloat(text);
}

class State {
	calc_: Calculator;

	constructor(calc: Calculator) {
		this.calc_ = calc;
	}

	get displayNumber(): number {
		throw new Error('not implemented');
	}

	get inefficientButtons(): ButtonId[] {
		return [];
	}

	pushButton(buttonId: ButtonId): State {
		throw new Error('not implemented');
	}
}

class ShowingAnswerState extends State {
	get displayNumber(): number {
		return this.calc_.answer_;
	}

	get inefficientButtons(): ButtonId[] {
		return [
			'bs',
			'=',
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

class InputtingDigitsState extends State {
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

	pushButton(buttonId: ButtonId): State {
		const buttonType = ButtonIdUtil.getType(buttonId);

		if (buttonType === 'digit') {
			if (buttonId === '.') {
				if (this.calc_.inputBuffers_.length === 0) {
					this.calc_.inputBuffers_.push(
						'0',
						buttonId,
					);
					return this;
				}
				if (this.calc_.inputBuffers_.indexOf('.') >= 0) {
					// Ignore duplicated dots (e.g. 3.14.16)
					return this;
				}
			}
			this.calc_.inputBuffers_.push(buttonId);
			return this;
		}

		if (buttonType === 'operator') {
			this.calc_.operate_();
			const nextState = new InputtingOperatorState(this.calc_);
			return nextState.pushButton(buttonId);
		}

		if (buttonType === 'delete') {
			if (this.calc_.inputBuffers_.length > 0) {
				this.calc_.inputBuffers_.pop();
			}
			return this;
		}

		if (buttonType === 'clear') {
			if (this.calc_.inputBuffers_.length === 0) {
				this.calc_.clear({
					operatorBuffer: true,
				});
				const nextState = new ShowingAnswerState(this.calc_);
				return nextState.pushButton(buttonId);
			}
			this.calc_.clear({
				inputBuffers: true,
			});
			return this;
		}

		if (buttonType === 'equal') {
			this.calc_.operate_();
			return new ShowingAnswerState(this.calc_);
		}

		throw new Error('not implemented');
	}
}

class InputtingOperatorState extends State {
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
		if (buttonType === 'digit') {
			const nextState = new InputtingDigitsState(this.calc_);
			return nextState.pushButton(buttonId);
		}
		if (buttonType === 'operator') {
			this.calc_.operatorBuffer_ = (buttonId: any);
			return this;
		}
		if (buttonType === 'delete') {
			// Do nothing
			return this;
		}
		if (buttonType === 'clear') {
			this.calc_.clear({
				answer: true,
				inputBuffers: true,
				operatorBuffer: true,
			});
			return new ShowingAnswerState(this.calc_);
		}
		if (buttonType === 'equal') {
			this.calc_.clear({
				inputBuffers: true,
				operatorBuffer: true,
			});
			return new ShowingAnswerState(this.calc_);
		}
		throw new Error('not implemented');
	}
}

type ClearTarget = {
	answer?: boolean,
	inputBuffers?: boolean,
	operatorBuffer?: boolean,
};

export default class Calculator {
	answer_: number = 0;
	inputBuffers_: ButtonId[] = [];
	maxInputBufferCount_: number = 10;
	operatorBuffer_: ?OperatorButtonId = null;
	state_: State = new ShowingAnswerState(this);

	get answer(): number {
		return this.answer_;
	}

	get displayNumber(): number {
		return this.state_.displayNumber;
	}

	get inefficientButtons(): ButtonId[] {
		return this.state_.inefficientButtons;
	}

	pushButton(buttonId: ButtonId) {
		this.state_ = this.state_.pushButton(buttonId);
	}

	clear(target: ClearTarget) {
		if (target.answer) {
			this.answer_ = 0;
		}
		if (target.inputBuffers) {
			this.inputBuffers_.splice(0);
		}
		if (target.operatorBuffer) {
			this.operatorBuffer_ = null;
		}
	}

	operate_() {
		const n1 = this.answer_;
		const n2 = createNumberFromButtonIds(this.inputBuffers_);
		this.clear({
			inputBuffers: true,
		});

		if (!this.operatorBuffer_) {
			this.answer_ = n2;
			return;
		}
		const operatorId = this.operatorBuffer_;
		this.operatorBuffer_ = null;

		const operators: {[OperatorButtonId]: (number, number) => number} = {
			'+': (a, b) => (a + b),
			'-': (a, b) => (a - b),
			'*': (a, b) => (a * b),
			'/': (a, b) => (a / b),
		};
		const operator = operators[operatorId];
		if (!operator) {
			throw new Error('invalid operator');
		}

		this.answer_ = operator(n1, n2);
	}
}
