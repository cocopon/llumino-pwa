// @flow

const SIGNIFICANT_DIGITS = 10;

const NumberFormatter = {
	format(num: ?number): string {
		if (num === null || num === undefined) {
			return '0';
		}

		if (num > 0 && num < Math.pow(10, -SIGNIFICANT_DIGITS)) {
			return '0';
		}

		if (num < 0 && num > -Math.pow(10, -SIGNIFICANT_DIGITS)) {
			return '0';
		}

		// NOTE: `-0 === 0` is true
		// so have to check the sign of zero as follows
		if (num === 0 &&
			1 / num === Number.NEGATIVE_INFINITY) {
			return '-0';
		}

		return num.toLocaleString(undefined, {
			maximumSignificantDigits: SIGNIFICANT_DIGITS,
		});
	},
};

export default NumberFormatter;
