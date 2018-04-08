// @flow

import Theme from './theme';

const THEMES: Theme[] = [
	Theme.fromObject(
		Theme.defaultObject(),
	),
	Theme.fromObject({
		background: '#161821',
		energy: '#84a0c6',
		foreground: '#c6c8d1',
		id: 'iceberg',
		name: 'Iceberg',
	}),
	Theme.fromObject({
		background: '#002b36',
		energy: '#2aa198',
		foreground: '#839496',
		id: 'solarized',
		name: 'Solarized dark',
	}),
	Theme.fromObject({
		background: '#282828',
		energy: '#fb4934',
		foreground: '#ebdbb2',
		id: 'gruvbox',
		name: 'Gruvbox',
	}),
	Theme.fromObject({
		background: '#0000ff',
		energy: '#ff00ff',
		foreground: '#ffffff',
		id: 'blue-screen',
		name: 'Blue screen',
	}),
];

export default THEMES;
