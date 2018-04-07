// @flow

import type {ButtonType} from './button-type';

export type NumberButtonId = '0' |
	'1' |
	'2' |
	'3' |
	'4' |
	'5' |
	'6' |
	'7' |
	'8' |
	'9';

export type OperatorButtonId = '+' |
	'-' |
	'*' |
	'/';

export type ButtonId = NumberButtonId |
	OperatorButtonId |
	'bs' |
	'c' |
	'.' |
	'=';

const ButtonIdUtil = {
	isDigit(buttonId: ButtonId): boolean {
		return !isNaN(parseInt(buttonId, 10)) ||
			buttonId === '.';
	},

	isOperator(buttonId: ButtonId): boolean {
		return buttonId === '+' ||
			buttonId === '-' ||
			buttonId === '*' ||
			buttonId === '/';
	},

	getType(buttonId: ButtonId): ?ButtonType {
		if (ButtonIdUtil.isDigit(buttonId)) {
			return 'digit';
		}
		if (ButtonIdUtil.isOperator(buttonId)) {
			return 'operator';
		}
		if (buttonId === 'bs') {
			return 'delete';
		}
		if (buttonId === 'c') {
			return 'clear';
		}
		if (buttonId === '=') {
			return 'equal';
		}
		return null;
	},

	fromKey(key: string, keyCode: number): ?ButtonId {
		if (ButtonIdUtil.getType((key: any)) !== null) {
			return (key: any);
		}

		if (keyCode === 8) {
			// BS
			return 'bs';
		}
		if (keyCode === 13) {
			// CR
			return '=';
		}

		const text = String.fromCharCode(keyCode).toLowerCase();
		return (ButtonIdUtil.getType((text: any)) !== null) ?
			(text: any) :
			null;
	},

	buildNumber(buttonIds: ButtonId[]): number {
		if (buttonIds.length === 0) {
			return 0;
		}

		const text = buttonIds.reduce((text, buttonId) => {
			return `${text}${buttonId}`;
		}, '');
		return parseFloat(text);
	},
};

export default ButtonIdUtil;
