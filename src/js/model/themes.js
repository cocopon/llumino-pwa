// @flow

import Theme from './theme';

const THEMES: Theme[] = [
	Theme.fromObject({
		background: '#000000',
		foreground: '#b7b7b7',
		id: 'default',
		name: 'Default',
	}),
	Theme.fromObject({
		background: '#161821',
		foreground: '#c6c8d1',
		id: 'iceberg',
		name: 'Iceberg',
	}),
	Theme.fromObject({
		background: '#002b36',
		foreground: '#839496',
		id: 'solarized',
		name: 'Solarized dark',
	}),
	Theme.fromObject({
		background: '#282828',
		foreground: '#ebdbb2',
		id: 'gruvbox',
		name: 'Gruvbox',
	}),
	Theme.fromObject({
		background: '#0000ff',
		foreground: '#ffffff',
		id: 'blue-screen',
		name: 'Blue screen',
	}),
];

export default THEMES;
