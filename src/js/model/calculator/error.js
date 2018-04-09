// @flow

type ErrorType = 'unknown' |
	'exceededMaximumDigits' |
	'invalidOperator' |
	'notImplemented';

const TYPE_TO_MESSAGE_MAP: {[ErrorType]: string} = {
	'exceededMaximumDigits': 'Exceeded maximum digits',
	'invalidOperator': 'Invalid operator',
	'notImplemented': 'Not implemented yet',
	'unknown': 'Unexpected error occurred',
};

export default class CalculatorError extends Error {
	type: ErrorType;

	constructor(errorType: ErrorType) {
		const message = TYPE_TO_MESSAGE_MAP[errorType];
		super(message);

		this.type = errorType;
	}
}
