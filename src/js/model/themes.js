// @flow

import Theme from './theme';

const THEMES: Theme[] = [
	Theme.fromObject(
		Theme.defaultObject(),
	),
	Theme.fromObject({
		background: '#0c1014',
		energies: ['#2aa889', '#c23127'],
		foreground: '#599cab',
		id: 'gotham',
		name: 'Gotham',
	}),
	Theme.fromObject({
		background: '#002b36',
		energies: ['#2aa198', '#268bd2'],
		foreground: '#839496',
		id: 'solarized-dark',
		name: 'Solarized dark',
	}),
	Theme.fromObject({
		background: '#161821',
		energies: ['#84a0c6', '#a093c7'],
		foreground: '#c6c8d1',
		id: 'iceberg',
		name: 'Iceberg',
	}),
	Theme.fromObject({
		background: '#282828',
		energies: ['#b8bb26', '#fb4934'],
		foreground: '#ebdbb2',
		id: 'gruvbox-dark',
		name: 'Gruvbox dark',
	}),
	Theme.fromObject({
		background: '#0000ff',
		energies: ['#ff00ff', '#ff00ff'],
		foreground: '#ffffff',
		id: 'blue-screen',
		name: 'Blue screen',
	}),
	Theme.fromObject({
		background: '#e1e1e1',
		energies: ['#719899', '#9a7599'],
		foreground: '#616161',
		id: 'seoul256-light',
		name: 'Seoul256 light',
	}),
];

export default THEMES;
