// @flow

import Color from 'color';

type ThemeTarget = {
	property?: string,
	selector: string,
	value?: (color: string) => string,
};

type ThemeObject = {
	background: string,
	energy: string,
	foreground: string,
	id: string,
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
		value(col: string): string {
			return `0 0.3em 0.6em ${Color(col).darken(0.5).alpha(0.3).string()}`;
		},
	},
	{selector: '.setting-page'},
];

const FG_TARGETS: ThemeTarget[] = [
	{selector: 'html'},
	{selector: '.calc-buttonGrid_buttonText'},
	{selector: '.calc-menuItem_button', property: 'background-color'},
	{
		selector: '.calc-menuItem_button',
		property: 'box-shadow',
		value(col: string): string {
			return `0 0 1em ${Color(col).alpha(0.5).string()}`;
		},
	},
	{selector: '.common-tabItem:before', property: 'background-color'},
	{
		selector: '.setting-themeListItem_preview',
		property: 'border-color',
		value(col: string): string {
			return Color(col).alpha(0.1).string();
		},
	},
];

const ENERGY_TARGETS: ThemeTarget[] = [
	{selector: '.calc-buttonGrid_button:active'},
	{selector: '.calc-buttonGrid_button.calc-buttonGrid_button-active'},
	{
		selector: '.calc-buttonGrid_button.calc-buttonGrid_button-inefficient:active',
		value(col: string): string {
			return Color(col).alpha(0.2).string();
		},
	},
	{selector: '.calc-buttonGrid_buttonEnergy'},
	{
		selector: '.calc-buttonGrid_buttonEnergy',
		property: 'box-shadow',
		value(col: string): string {
			return `0 0 0.5em ${Color(col).string()}`;
		},
	},
];

export default class Theme {
	backgroundColor: string;
	energyColor: string;
	foregroundColor: string;
	id: string;
	name: string;

	generateCss(): string {
		const rules: string[] = [];

		rules.push(...BG_TARGETS.map((target: ThemeTarget): string => {
			return createRule(
				target.selector,
				target.property || 'background-color',
				target.value ?
					target.value(this.backgroundColor) :
					this.backgroundColor,
			);
		}));

		rules.push(...FG_TARGETS.map((target) => {
			return createRule(
				target.selector,
				target.property || 'color',
				target.value ?
					target.value(this.foregroundColor) :
					this.foregroundColor,
			);
		}));

		rules.push(...ENERGY_TARGETS.map((target: ThemeTarget): string => {
			return createRule(
				target.selector,
				target.property || 'background-color',
				target.value ?
					target.value(this.energyColor) :
					this.energyColor,
			);
		}));

		return rules.join(' ');
	}

	static fromObject(obj: ThemeObject): Theme {
		const theme = new Theme();
		theme.backgroundColor = obj.background;
		theme.energyColor = obj.energy;
		theme.foregroundColor = obj.foreground;
		theme.id = obj.id;
		theme.name = obj.name;
		return theme;
	}

	static defaultObject(): ThemeObject {
		return {
			background: '#000000',
			energy: '#ff00ff',
			foreground: '#b7b7b7',
			id: 'default',
			name: 'Default',
		};
	}
}
