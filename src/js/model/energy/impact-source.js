// @flow

import Source from './source';

export default class ImpactSource extends Source {
	getEnergy(x: number, y: number): number {
		return (x === this.x && y === this.y) ?
			this.power_ :
			0;
	}

	update() {
		this.power_ = Math.max(this.power_ - 0.04, 0);
	}
}
