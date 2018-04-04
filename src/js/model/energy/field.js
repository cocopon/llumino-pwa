// @flow

import Source from './source';

export default class Field {
	sources_: Source[] = [];

	constructor() {
	}

	getEnergy(x: number, y: number): number {
		return this.sources_.reduce((total, source) => {
			return total + source.getEnergy(x, y);
		}, 0);
	}

	update() {
		this.sources_.forEach((source) => {
			source.update();
		});
	}

	add(source: Source) {
		this.sources_.push(source);
	}
}
