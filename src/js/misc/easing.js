// @flow

/*
 * easing.ts - brings Robert Penner's easing functions into JavaScript
 * (c) 2015 cocopon.
 *
 * See the following to learn more about these famous functions:
 * http://www.robertpenner.com/easing/
 *
 * License:
 * http://www.robertpenner.com/easing_terms_of_use.html
 */
const Easing = {
	// t: time
	// b: beginning
	// c: change
	// d: duration
	linear(t: number, b: number, c: number, d: number): number {
		return c * t / d + b;
	},

	inBack(t: number, b: number, c: number, d: number, opt_s: number): number {
		var s = (opt_s !== undefined) ? opt_s : 1.70158;
		t /= d;
		return c * t * t * ((s + 1) * t - s) + b;
	},

	inBounce(t: number, b: number, c: number, d: number): number {
		t = (d - t) / d;

		var v;
		if (t < 1 / 2.75) {
			v = c * (7.5625 * t * t);
		}
		else if (t < 2 / 2.75) {
			t -= 1.5 / 2.75;
			v = c * (7.5625 * t * t + 0.75);
		}
		else if (t < 2.5 / 2.75) {
			t -= 2.25 / 2.75;
			v = c * (7.5625 * t * t + 0.9375);
		}
		else {
			t -= 2.625 / 2.75;
			v = c * (7.5625 * t * t + 0.984375);
		}

		return c - v + b;
	},

	inCirc(t: number, b: number, c: number, d: number): number {
		t /= d;
		return -c * (Math.sqrt(1 - t * t) - 1) + b;
	},

	inCubic(t: number, b: number, c: number, d: number): number {
		t /= d;
		return b + c * t * t * t;
	},

	inElastic(t: number, b: number, c: number, d: number, opt_s: number): number {
		var s = (opt_s !== undefined) ? opt_s : 1.70158;
		var p = d * 0.3;
		var a = c;

		if (t === 0) {
			return b;
		}
		if (t / d === 1.0) {
			return b + c;
		}

		if (a < Math.abs(c)) {
			a = c;
			s = p / 4;
		}
		else {
			s = p / (2 * 3.1419) * Math.asin(c / a);
		}

		--t;
		return -(a * Math.pow(2, 10 * t) * Math.sin((t * d - s) * (2 * 3.1419) / p)) + b;
	},

	inExpo(t: number, b: number, c: number, d: number): number {
		return c * Math.pow(2, 10 * (t / d - 1)) + b;
	},

	inQuad(t: number, b: number, c: number, d: number): number {
		t /= d;
		return b + c * t * t;
	},

	inQuart(t: number, b: number, c: number, d: number): number {
		t /= d;
		return b + c * t * t * t * t;
	},

	inQuint(t: number, b: number, c: number, d: number): number {
		t /= d;
		return b + c * t * t * t * t * t;
	},

	inSine(t: number, b: number, c: number, d: number): number {
		return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
	},

	outBack(t: number, b: number, c: number, d: number, opt_s: number): number {
		var s = (opt_s !== undefined) ? opt_s : 1.70158;
		t = t / d - 1.0;
		return c * (t * t * ((s + 1.0) * t + s) + 1.0) + b;
	},

	outBounce(t: number, b: number, c: number, d: number): number {
		t /= d;

		if (t < 1 / 2.75) {
			return c * (7.5625 * t * t) + b;
		}
		if (t < 2 / 2.75) {
			t -= 1.5 / 2.75;
			return c * (7.5625 * t * t + 0.75) + b;
		}
		if (t < 2.5 / 2.75) {
			t -= 2.25 / 2.75;
			return c * (7.5625 * t * t + 0.9375) + b;
		}

		t -= 2.625 / 2.75;
		return c * (7.5625 * t * t + 0.984375) + b;
	},

	outCirc(t: number, b: number, c: number, d: number): number {
		t = t / d - 1;
		return c * Math.sqrt(1 - t * t) + b;
	},

	outCubic(t: number, b: number, c: number, d: number): number {
		t = t / d - 1;
		return b + c * (t * t * t + 1);
	},

	outElastic(t: number, b: number, c: number, d: number, opt_s: number): number {
		var s = (opt_s !== undefined) ? opt_s : 1.70158;
		var p = d * 0.3;
		var a = c;

		if (t === 0) {
			return b;
		}
		if (t === 1.0) {
			return b + c;
		}

		if (a < Math.abs(c)) {
			a = c;
			s = p / 4;
		}
		else {
			s = p / (2 * 3.1419) * Math.asin(c / a);
		}
		return a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * 3.1419) / p) + c + b;
	},

	outExpo(t: number, b: number, c: number, d: number): number {
		return c * (-Math.pow(2, -10 * t / d) + 1) + b;
	},

	outQuad(t: number, b: number, c: number, d: number): number {
		t /= d;
		return b + (-c * t * (t - 2));
	},

	outQuart(t: number, b: number, c: number, d: number): number {
		t = t / d - 1;
		return b - c * (t * t * t * t - 1);
	},

	outQuint(t: number, b: number, c: number, d: number): number {
		t = t / d - 1;
		return b + c * (t * t * t * t * t + 1);
	},

	outSine(t: number, b: number, c: number, d: number): number {
		return c * Math.sin(t / d * (Math.PI / 2)) + b;
	},

	inOutBack(t: number, b: number, c: number, d: number, opt_s: number): number {
		var s = (opt_s !== undefined) ? opt_s : 1.70158;
		var k = 1.525;

		t /= d / 2;
		s *= k;

		if (t < 1) {
			return c / 2 * (t * t * ((s + 1) * t - s)) + b;
		}
		t -= 2;
		return c / 2 * (t * t * ((s + 1) * t + s) + 2) + b;
	},

	inOutBounce(t: number, b: number, c: number, d: number): number {
		return (t < d / 2) ?
			(Easing.inBounce(t * 2, 0, c, d) * 0.5 + b) :
			(Easing.outBounce(t * 2 - d, 0, c, d) * 0.5 + c * 0.5 + b);
	},

	inOutCirc(t: number, b: number, c: number, d: number): number {
		t = t / d * 2;

		if (t < 1) {
			return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
		}

		t -= 2;
		return c / 2 * (Math.sqrt(1 - t * t) + 1) + b;
	},

	inOutCubic(t: number, b: number, c: number, d: number): number {
		t = t / d * 2;

		if (t < 1) {
			return c / 2 * t * t * t + b;
		}

		t -= 2;
		return b + c / 2 * (t * t * t + 2);
	},

	inOutElastic(t: number, b: number, c: number, d: number, opt_s: number): number {
		var s = (opt_s !== undefined) ? opt_s : 1.70158;
		var p = d * 0.3 * 1.5;
		var a = c;

		t /= d / 2;

		if (t === 0) {
			return b;
		}
		if (t === 2) {
			return b + c;
		}

		if (a < Math.abs(c)) {
			a = c;
			s = p / 4;
		}
		else {
			s = p / (2 * 3.1419) * Math.asin(c / a);
		}

		if (t < 1) {
			--t;
			return -0.5 * (a * Math.pow(2, 10 * t) * Math.sin((t * d - s) * (2 * 3.1419) / p)) + b;
		}
		--t;
		return a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * 3.1419) / p) * 0.5 + c + b;
	},

	inOutExpo(t: number, b: number, c: number, d: number): number {
		t = t / d * 2;

		if (t < 1) {
			return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
		}

		--t;
		return c / 2 * (-Math.pow(2, -10 * t) + 2) + b;
	},

	inOutQuad(t: number, b: number, c: number, d: number): number {
		t = t / d * 2;

		if (t < 1) {
			return c / 2 * t * t + b;
		}

		--t;
		return -c / 2 * (t * (t - 2) - 1) + b;
	},

	inOutQuart(t: number, b: number, c: number, d: number): number {
		t = t / d * 2;

		if (t < 1) {
			return c / 2 * t * t * t * t + b;
		}

		t -= 2;
		return b - c / 2 * (t * t * t * t - 2);
	},

	inOutQuint(t: number, b: number, c: number, d: number): number {
		t = t / d * 2;

		if (t < 1) {
			return c / 2 * t * t * t * t * t + b;
		}

		t -= 2;
		return b + c / 2 * (t * t * t * t * t + 2);
	},

	inOutSine(t: number, b: number, c: number, d: number): number {
		return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
	},
};

export default Easing;
