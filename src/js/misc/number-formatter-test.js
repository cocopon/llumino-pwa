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

	it('should format circulator', () => {
		Assert.strictEqual(
			NumberFormatter.format(1 / 3),
			'0.3333333333',
		);
	});
});
