// @flow

import ButtonIdUtil from '../button-id';
import ShowingAnswerState from './showing-answer.state';
import State from './state';

import type {ButtonId, OperatorButtonId} from '../button-id';

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

	set answer(answer: number) {
		this.answer_ = answer;
		this.clear({
			inputBuffers: true,
			operatorBuffer: true,
		});
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
}
