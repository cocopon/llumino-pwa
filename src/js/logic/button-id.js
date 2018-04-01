// @flow

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
	'c' |
	'.' |
	'=';
