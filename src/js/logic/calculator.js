// @flow

type NumberButtonId = '0' |
	'1' |
	'2' |
	'3' |
	'4' |
	'5' |
	'6' |
	'7' |
	'8' |
	'9';

type OperatorButtonId = '+' |
	'-' |
	'*' |
	'/';

export type ButtonId = NumberButtonId |
	OperatorButtonId |
	'c' |
	'.' |
	'=';

export type ButtonType = 'digit' |
	'operator' |
	'clear' |
	'equal';

const ButtonIdUtil = {
	isDigit(buttonId: ButtonId): boolean {
		return !isNaN(parseInt(buttonId, 10)) ||
			buttonId === '.';
	},
	isOperator(buttonId: ButtonId): boolean {
		return buttonId === '+' ||
			buttonId === '-' ||
			buttonId === '*' ||
			buttonId === '/';
	},
	getType(buttonId: ButtonId): ?ButtonType {
		if (ButtonIdUtil.isDigit(buttonId)) {
			return 'digit';
		}
		if (ButtonIdUtil.isOperator(buttonId)) {
			return 'operator';
		}
		if (buttonId === 'c') {
			return 'clear';
		}
		if (buttonId === '=') {
			return 'equal';
		}
		return null;
	},
};

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

	pushButton(buttonId: ButtonId): State {
		throw new Error('not implemented');
	}
}

class ShowingAnswerState extends State {
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
		if (buttonType === 'clear') {
			this.calc_.answer_ = 0;
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
	pushButton(buttonId: ButtonId): State {
		const buttonType = ButtonIdUtil.getType(buttonId);
		if (buttonType === 'digit') {
			this.calc_.inputBuffers_.push(buttonId);
			return this;
		}
		if (buttonType === 'operator') {
			this.calc_.operate_();
			const nextState = new InputtingOperatorState(this.calc_);
			return nextState.pushButton(buttonId);
		}
		if (buttonType === 'clear') {
			if (this.calc_.inputBuffers_.length === 0) {
				this.calc_.operatorBuffer_ = null;
				const nextState = new ShowingAnswerState(this.calc_);
				return nextState.pushButton(buttonId);
			}
			this.calc_.inputBuffers_.splice(0);
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
		throw new Error('not implemented');
	}
}

export default class Calculator {
	answer_: number = 0;
	inputBuffers_: ButtonId[] = [];
	operatorBuffer_: ?OperatorButtonId = null;
	state_: State = new ShowingAnswerState(this);

	get answer(): number {
		return this.answer_;
	}

	pushButton(buttonId: ButtonId) {
		this.state_ = this.state_.pushButton(buttonId);
	}

	operate_() {
		const n1 = this.answer_;
		const n2 = createNumberFromButtonIds(this.inputBuffers_);
		this.inputBuffers_.splice(0);

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
