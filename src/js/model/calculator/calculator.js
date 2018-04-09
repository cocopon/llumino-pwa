// @flow

import ButtonIdUtil from '../button-id';
import CalculatorError from './error';
import ShowAnswerState from './show-answer-state';
import ShowErrorState from './show-error-state';
import State from './state';

import type {ButtonId, OperatorButtonId} from '../button-id';

type ClearTarget = {
	answer?: boolean,
	error?: boolean,
	inputBuffers?: boolean,
	operatorBuffer?: boolean,
};

export default class Calculator {
	answer_: number = 0;
	error_: ?CalculatorError = null;
	inputBuffers_: ButtonId[] = [];
	maxInputBufferCount_: number = 10;
	operatorBuffer_: ?OperatorButtonId = null;
	state_: State = new ShowAnswerState(this);

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

	get inefficientButtons(): ButtonId[] {
		return this.state_.inefficientButtons;
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
}
