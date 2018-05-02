// @flow

const NumberFormatter = {
	format(num: ?number): string {
		if (num === null || num === undefined) {
			return '0';
		}

		// NOTE: `-0 === 0` is true
		// so have to check the sign of zero as follows
		if (num === 0 &&
			1 / num === Number.NEGATIVE_INFINITY) {
			return '-0';
		}

		return num.toLocaleString(undefined, {
			maximumSignificantDigits: 10,
		});
	},
};

export default NumberFormatter;
