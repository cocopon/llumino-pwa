// @flow

const NumberFormatter = {
	format(num: ?number): string {
		if (num === null || num === undefined) {
			return '0';
		}

		return num.toLocaleString(undefined, {
			maximumSignificantDigits: 10,
		});
	},
};

export default NumberFormatter;
