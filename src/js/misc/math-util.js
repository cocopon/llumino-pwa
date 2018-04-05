// @flow

const MathUtil = {
	limit(value: number, min: number, max: number): number {
		return Math.min(Math.max(value, min), max);
	},

	map(value: number, start1: number, end1: number, start2: number, end2: number) {
		return (value - start1) / (end1 - start1) * (end2 - start2) + start2;
	},

	dist(x1: number, y1: number, x2: number, y2: number) {
		const dx = x2 - x1;
		const dy = y2 - y1;
		return Math.sqrt(dx * dx + dy * dy);
	},

	random(min: number, max: number) {
		return MathUtil.map(
			Math.random(),
			0, 1,
			min, max,
		);
	},
};

export default MathUtil;
