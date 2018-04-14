// @flow

import Color from 'color';

type ThemeTarget = {
	property?: string,
	selector: string,
	value?: (color: Color) => string,
};

type ThemeObject = {
	author: string,
	background: string,
	energies: string[],
	foreground: string,
	id: string,
	license?: ?string,
	name: string,
};

function createRule(selector: string, property: string, value: string): string {
	return `${selector} {${property}: ${value};}`;
}

const BG_TARGETS: ThemeTarget[] = [
	{selector: 'html'},
	{
		selector: '.calc-menuItem_button',
		property: 'color',
	},
	{
		selector: '.calc-menuItem_button',
		property: 'color',
	},
	{selector: '.common-appBar'},
	{selector: '.common-tab_itemsLayout'},
	{
		selector: '.common-tab_itemsLayout',
		property: 'box-shadow',
		value(col: Color): string {
			return `0 0.3em 0.6em ${col.darken(0.5).alpha(0.3).string()}`;
		},
	},
	{selector: '.setting-page'},
];

const FG_TARGETS: ThemeTarget[] = [
	{selector: 'html'},
	{selector: '.calc-buttonGrid_buttonText'},
	{
		selector: '.calc-display:active',
		property: 'background-color',
		value(col: Color): string {
			return col.alpha(0.05).string();
		},
	},
	{selector: '.calc-menuItem_button', property: 'background-color'},
	{
		selector: '.calc-menuItem_button',
		property: 'box-shadow',
		value(col: Color): string {
			return `0 0 1em ${col.alpha(0.5).string()}`;
		},
	},
	{selector: '.common-tabItem:before', property: 'background-color'},
	{
		selector: '.common-tabItem_button:active',
		property: 'background-color',
		value(col: Color): string {
			return col.alpha(0.1).string();
		},
	},
];

const ROW_TO_ENERGY_TARGETS: (row: number) => ThemeTarget[] = (row: number) => {
	const layout = `.calc-buttonGrid_buttonLayout:nth-child(n + ${1 + row * 4})`;
	const button = '.calc-buttonGrid_button';
	const energy = '.calc-buttonGrid_buttonEnergy';
	return [
		{selector: `${layout} ${button}:active`},
		{selector: `${layout} ${button}-active`},
		{
			selector: `${layout} ${button}-inefficient:active`,
			value(col: Color): string {
				return col.alpha(0.2).string();
			},
		},
		{selector: `${layout} ${energy}`},
		{
			selector: `${layout} ${energy}`,
			property: 'box-shadow',
			value(col: Color): string {
				return `0 0 2em ${col.alpha(0.5).string()}`;
			},
		},
	];
};

export default class Theme {
	author: string;
	backgroundColor: string;
	energyColors: string[];
	foregroundColor: string;
	id: string;
	license: ?string;
	name: string;

	generateBaseCss(): string {
		const rules: string[] = [];

		rules.push(...BG_TARGETS.map((target: ThemeTarget): string => {
			const col = Color(this.backgroundColor);
			return createRule(
				target.selector,
				target.property || 'background-color',
				target.value ?
					target.value(col) :
					this.backgroundColor,
			);
		}));

		rules.push(...FG_TARGETS.map((target) => {
			const col = Color(this.foregroundColor);
			return createRule(
				target.selector,
				target.property || 'color',
				target.value ?
					target.value(col) :
					this.foregroundColor,
			);
		}));

		return rules.join(' ');
	}

	generateEnergyCss(): string {
		const rules: string[] = [];

		const ROW_COUNT = 5;
		[0, 1, 2, 3, 4].forEach((row) => {
			rules.push(...ROW_TO_ENERGY_TARGETS(row).map((target) => {
				const c1 = Color(this.energyColors[0]);
				const c2 = Color(this.energyColors[1]);
				const c = c1.mix(c2, row / (ROW_COUNT - 1));
				return createRule(
					target.selector,
					target.property || 'background-color',
					target.value ?
						target.value(c) :
						c.toString(),
				);
			}));
		});

		return rules.join(' ');
	}

	toObject(): ThemeObject {
		return {
			author: this.author,
			background: this.backgroundColor,
			energies: this.energyColors,
			foreground: this.foregroundColor,
			id: this.id,
			license: this.license,
			name: this.name,
		};
	}

	static fromObject(obj: ThemeObject): Theme {
		const theme = new Theme();
		theme.author = obj.author;
		theme.backgroundColor = obj.background;
		theme.energyColors = obj.energies;
		theme.foregroundColor = obj.foreground;
		theme.id = obj.id;
		theme.license = obj.license;
		theme.name = obj.name;
		return theme;
	}

	static defaultObject(): ThemeObject {
		return {
			author: 'cocopon',
			background: '#000000',
			energies: ['#ff00ff', '#ff0088'],
			foreground: '#b7b7b7',
			id: 'default',
			name: 'Default',
		};
	}
}
