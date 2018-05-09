// @flow

import NumberFormatter from '../../misc/number-formatter';
import Calculator from './calculator';

import type {ButtonId} from '../button-id';

export default class State {
	calc_: Calculator;

	constructor(calc: Calculator) {
		this.calc_ = calc;
	}

	get displayNumber(): number {
		return this.calc_.answer;
	}

	get displayText(): string {
		return NumberFormatter.format(this.calc_.displayNumber);
	}

	get inefficientButtons(): ButtonId[] {
		return [];
	}

	pushButton(_buttonId: ButtonId): State {
		throw new Error('not implemented');
	}
}
