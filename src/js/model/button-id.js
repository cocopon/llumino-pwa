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
	'%' |
	'bs' |
	'c' |
	'inv' |
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

		const MAP: {[ButtonId]: ButtonType} = {
			'%': 'percent',
			'=': 'equal',
			'bs': 'delete',
			'c': 'clear',
			'inv': 'invert',
		};
		return MAP[buttonId] || null;
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

	buildNumberText(buttonIds: ButtonId[]): string {
		return buttonIds.reduce((text, buttonId) => {
			return text + buttonId;
		}, '');
	},

	buildNumber(buttonIds: ButtonId[]): number {
		if (buttonIds.length === 0) {
			return 0;
		}

		const text = ButtonIdUtil.buildNumberText(buttonIds);

		if (text === '-') {
			return -0;
		}

		return parseFloat(text);
	},
};

export default ButtonIdUtil;
