// @flow

const NumberFormatter = {
	format(num: number): string {
		return num.toLocaleString(undefined, {
			maximumSignificantDigits: 10,
		});
	},
};

export default NumberFormatter;
