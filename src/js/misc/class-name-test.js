// @flow

import {describe, it} from 'mocha';
import Assert from 'power-assert';

import ClassName from './class-name';

describe('ClassName', () => {
	it('should return block', () => {
		Assert.strictEqual(
			ClassName('prefix', 'block')(),
			'prefix-block'
		);
	});

	it('should return block and element', () => {
		Assert.strictEqual(
			ClassName('prefix', 'block')('element'),
			'prefix-block_element'
		);
	});

	it('should return block with modifier', () => {
		Assert.strictEqual(
			ClassName('prefix', 'block')({modifier: true}),
			'prefix-block prefix-block-modifier'
		);
	});

	it('should return block with disabled modifier', () => {
		Assert.strictEqual(
			ClassName('prefix', 'block')({modifier: false}),
			'prefix-block'
		);
	});

	it('should return block with multiple modifiers', () => {
		Assert.strictEqual(
			ClassName('prefix', 'block')({foo: true, bar: false, baz: true}),
			'prefix-block prefix-block-foo prefix-block-baz'
		);
	});

	it('should return block and element with modifier', () => {
		Assert.strictEqual(
			ClassName('prefix', 'block')('element', {modifier: true}),
			'prefix-block_element prefix-block_element-modifier'
		);
	});

	it('should return block and element with multiple modifiers', () => {
		Assert.strictEqual(
			ClassName('prefix', 'block')('element', {foo: true, bar: true, baz: false}),
			'prefix-block_element prefix-block_element-foo prefix-block_element-bar'
		);
	});
});
