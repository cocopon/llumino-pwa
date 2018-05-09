// @flow

import CalculatorError from './error';
import InputDigitsState from './input-digits-state';
import InputOperatorState from './input-operator-state';
import ShowAnswerState from './show-answer-state';
import ShowErrorState from './show-error-state';
import State from './state';

import type {ButtonId, OperatorButtonId} from '../button-id';

type ErrorObject = {
	type: string,
};

export type CalculatorObject = {
	answer: number,
	error: ?ErrorObject,
	inputBuffers: string[],
	operatorBuffer: ?string,
	stateId: string,
};

type ClearTarget = {
	answer?: boolean,
	error?: boolean,
	inputBuffers?: boolean,
	operatorBuffer?: boolean,
};

type StateId = 'inputDigits' |
	'inputOperator' |
	'showAnswer' |
	'showError';

const STATE_ID_TO_CLASS_MAP: {[StateId]: Class<State>} = {
	inputDigits: InputDigitsState,
	inputOperator: InputOperatorState,
	showAnswer: ShowAnswerState,
	showError: ShowErrorState,
};

function getIdOfState(state: State): string {
	const stateIds = Object.keys(STATE_ID_TO_CLASS_MAP);
	const stateId = stateIds.filter((id) => {
		const StateClass = STATE_ID_TO_CLASS_MAP[id];
		return state instanceof StateClass;
	})[0];

	if (!stateId) {
		throw new Error('Invalid state class');
	}

	return stateId;
}

	export default class Calculator {
	answer_: number = 0;
	error_: ?CalculatorError = null;
	inputBuffers_: ButtonId[] = [];
	maxInputBufferCount_: number = 10;
	operatorBuffer_: ?OperatorButtonId = null;
	state_: State = new ShowAnswerState(this);

	static initialState(): CalculatorObject {
		return {
			answer: 0,
			error: null,
			inputBuffers: [],
			operatorBuffer: null,
			stateId: 'showAnswer',
		};
	}

	get answer(): number {
		return this.answer_;
	}

	set answer(answer: number) {
		this.answer_ = answer;
		this.clear({
			error: true,
			inputBuffers: true,
			operatorBuffer: true,
		});
	}

	get error(): ?CalculatorError {
		return this.error_;
	}

	get displayNumber(): number {
		return this.state_.displayNumber;
	}

	get displayText(): string {
		return this.error ?
			'Error' :
			this.state_.displayText;
	}

	get inefficientButtons(): ButtonId[] {
		return this.state_.inefficientButtons;
	}

	get bufferedOperator(): ?OperatorButtonId {
		return this.operatorBuffer_;
	}

	get inputBuffers(): ButtonId[] {
		return [].concat(this.inputBuffers_);
	}

	pushButton(buttonId: ButtonId) {
		try {
			this.state_ = this.state_.pushButton(buttonId);
		} catch (err) {
			if (err.type) {
				this.error_ = err;
				this.state_ = new ShowErrorState(this);
			} else {
				throw err;
			}
		}
	}

	clear(target: ClearTarget) {
		if (target.answer) {
			this.answer_ = 0;
		}
		if (target.error) {
			this.error_ = null;
		}
		if (target.inputBuffers) {
			this.inputBuffers_.splice(0);
		}
		if (target.operatorBuffer) {
			this.operatorBuffer_ = null;
		}
	}

	toObject(): CalculatorObject {
		return {
			answer: this.answer,
			error: (this.error && (this.error.type: any)) || null,
			inputBuffers: (this.inputBuffers_: any),
			operatorBuffer: (this.operatorBuffer_: any),
			stateId: getIdOfState(this.state_),
		};
	}

	static createStateFromId_(calc: Calculator, stateId: string): State {
		const StateClass = STATE_ID_TO_CLASS_MAP[(stateId: any)];
		if (!StateClass) {
			throw new Error(`Invalid state id: ${stateId}`);
		}

		return new StateClass(calc);
	}

	static fromObject(obj: CalculatorObject): Calculator {
		const calc = new Calculator();
		calc.answer_ = obj.answer;
		calc.error_ = (obj.error && (new CalculatorError((obj.error: any)))) || null;
		calc.inputBuffers_ = (obj.inputBuffers: any);
		calc.operatorBuffer_ = (obj.operatorBuffer: any);
		calc.state_ = this.createStateFromId_(calc, obj.stateId);
		return calc;
	}
}
