// @flow

import {describe, it} from 'mocha';
import Assert from 'power-assert';

import NumberFormatter from './number-formatter';


describe('NumberFormatter', () => {
	it('should format integer', () => {
		Assert.strictEqual(
			NumberFormatter.format(123456789),
			'123,456,789',
		);
	});

	it('should format decimal', () => {
		Assert.strictEqual(
			NumberFormatter.format(3.1416),
			'3.1416',
		);
	});

	it('should format long decimal', () => {
		Assert.strictEqual(
			NumberFormatter.format(123456.789),
			'123,456.789',
		);
		Assert.strictEqual(
			NumberFormatter.format(3.141592653),
			'3.141592653',
		);
	});

	it('should format small value', () => {
		Assert.strictEqual(
			NumberFormatter.format(1e-10),
			'0.0000000001',
		);
		Assert.strictEqual(
			NumberFormatter.format(1e-11),
			'0',
		);
		Assert.strictEqual(
			NumberFormatter.format(-1e-11),
			'0',
		);
	});

	it('should format circulator', () => {
		Assert.strictEqual(
			NumberFormatter.format(1 / 3),
			'0.3333333333',
		);
	});

	it('should format null value', () => {
		Assert.strictEqual(
			NumberFormatter.format(null),
			'0',
		);
		Assert.strictEqual(
			NumberFormatter.format(undefined),
			'0',
		);
	});

	it('should format negative zero', () => {
		Assert.strictEqual(
			NumberFormatter.format(-0),
			'-0',
		);
	});

	it('should format other falsy values', () => {
		Assert.strictEqual(
			NumberFormatter.format(0),
			'0',
		);
		Assert.strictEqual(
			NumberFormatter.format(0.0),
			'0',
		);
	});

	it('should not throw exception for special values', () => {
		Assert.doesNotThrow(() => {
			NumberFormatter.format(NaN);
			NumberFormatter.format(Number.NEGATIVE_INFINITY);
			NumberFormatter.format(Number.POSITIVE_INFINITY);
			NumberFormatter.format(Number.MAX_VALUE);
			NumberFormatter.format(Number.MIN_VALUE);
		});
	});
});
