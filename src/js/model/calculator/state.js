// @flow

import Calculator from './calculator';

import type {ButtonId} from '../button-id';

export default class State {
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
