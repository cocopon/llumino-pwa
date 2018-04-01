// @flow

import {describe, it} from 'mocha';
import Assert from 'power-assert';

import Calculator from './calculator';

import type {ButtonId} from './button-id';

function pushButtons(calc: Calculator, buttonIds: ButtonId[]) {
	buttonIds.forEach((buttonId) => {
		calc.pushButton(buttonId);
	});
}

describe('Calculator', () => {
	it('Initial state should be zero', () => {
		const calc = new Calculator();
		Assert.strictEqual(
			calc.answer,
			0,
		);
	});

	it('should input integer directly', () => {
		const calc = new Calculator();
		pushButtons(calc, ['3', '1', '4', '=']);
		Assert.strictEqual(
			calc.answer,
			314,
		);
	});

	it('should clear answer', () => {
		const calc = new Calculator();
		pushButtons(calc, ['3', '1', '4', '=', 'c']);
		Assert.strictEqual(
			calc.answer,
			0,
		);
	});

	it('should clear inputting digits', () => {
		const calc = new Calculator();
		pushButtons(calc, [
			'3', '1', '4', '+',
			'5', '6', 'c',
		]);
		Assert.strictEqual(
			calc.answer,
			314,
		);
	});

	it('should input decimal number directly', () => {
		const calc = new Calculator();
		pushButtons(calc, ['2', '.', '7', '2', '=']);
		Assert.strictEqual(
			calc.answer,
			2.72,
		);
	});

	it('should operate a number', () => {
		{
			const calc = new Calculator();
			pushButtons(calc, ['1', '2', '+', '3', '=']);
			Assert.strictEqual(
				calc.answer,
				12 + 3,
				'should add a number'
			);
		} {
			const calc = new Calculator();
			pushButtons(calc, ['4', '-', '5', '6', '=']);
			Assert.strictEqual(
				calc.answer,
				4 - 56,
				'should substract a number'
			);
		} {
			const calc = new Calculator();
			pushButtons(calc, ['7', '8', '*', '9', '0', '=']);
			Assert.strictEqual(
				calc.answer,
				78 * 90,
				'should multiply a number'
			);
		} {
			const calc = new Calculator();
			pushButtons(calc, ['1', '2', '/', '3', '4', '=']);
			Assert.strictEqual(
				calc.answer,
				12 / 34,
				'should divide a number'
			);
		}
	});

	it('should operate multiple numbers', () => {
		const calc = new Calculator();
		pushButtons(calc, [
			'1', '2', '+',
			'3', '4', '-',
			'5', '6', '*',
			'7', '8', '/',
			'9', '0', '=',
		]);
		Assert.strictEqual(
			calc.answer,
			((((12 + 34) - 56) * 78) / 90),
		);
	});

	it('should change an operator', () => {
		const calc = new Calculator();
		pushButtons(calc, [
			'1', '2',
			'+', '-', '*',
			'3', '4', '=',
		]);
		Assert.strictEqual(
			calc.answer,
			12 * 34,
		);
	});
});
