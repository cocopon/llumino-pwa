// @flow

export default class Source {
	x: number;
	y: number;
	power_: number;

	constructor(x: number, y: number) {
		this.x = x;
		this.y = y;
		this.power_ = 1;
	}

	getEnergy(_x: number, _y: number): number {
		return 0;
	}

	isDepleted(): boolean {
		return this.power_ < 0;
	}

	update() {}
}
