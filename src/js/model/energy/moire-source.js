// @flow

import Easing from '../../misc/easing';
import MathUtil from '../../misc/math-util';
import Source from './source';

export default class ImpactSource extends Source {
	getEnergy(x: number, y: number): number {
		const d = MathUtil.dist(
			this.x, this.y,
			x, y
		);

		const r = Easing.outQuad(1 - this.power_, 0, 1, 1) * 3.5;
		const dd = MathUtil.limit(
			1 - Math.pow(Math.abs(d - r) * 0.7, 0.9),
			0, 1
		);

		return dd * this.power_ * 0.3;
	}

	update() {
		this.power_ = Math.max(this.power_ - 0.015, 0);
	}
}
