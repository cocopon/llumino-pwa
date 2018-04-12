// @flow

import Calculator from './calculator';
import CalculatorError from './error';
import InputDigitsState from './input-digits-state';
import InputOperatorState from './input-operator-state';
import ShowAnswerState from './show-answer-state';
import ShowErrorState from './show-error-state';
import State from './state';

type PersistedErrorObject = {
	type: string,
};

type PersistedObject = {
	answer: number,
	error: ?PersistedErrorObject,
	inputBuffers: string[],
	operatorBuffer: ?string,
	stateId: string,
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

function createStateFromId(calc: Calculator, stateId: string): State {
	const StateClass = STATE_ID_TO_CLASS_MAP[(stateId: any)];
	if (!StateClass) {
		throw new Error(`Invalid state id: ${stateId}`);
	}

	return new StateClass(calc);
}

export default {
	persist(calc: Calculator): PersistedObject {
		return {
			answer: calc.answer,
			error: (calc.error && (calc.error.type: any)) || null,
			inputBuffers: (calc.inputBuffers_: any),
			operatorBuffer: (calc.operatorBuffer_: any),
			stateId: getIdOfState(calc.state_),
		};
	},

	hydrate(obj: PersistedObject): Calculator {
		const calc = new Calculator();
		calc.answer_ = obj.answer;
		calc.error_ = (obj.error && (new CalculatorError((obj.error: any)))) || null;
		calc.inputBuffers_ = (obj.inputBuffers: any);
		calc.operatorBuffer_ = (obj.operatorBuffer: any);
		calc.state_ = createStateFromId(calc, obj.stateId);
		return calc;
	},
}
