// @flow

import Color from 'color';

type ThemeTarget = {
	property?: string,
	selector: string,
	value?: (color: string) => string,
};

type ThemeObject = {
	background: string,
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
	{
		selector: '.common-tab_itemsLayout',
		property: 'box-shadow',
		value(col: string): string {
			return `0 1vh 2vh ${Color(col).darken(0.3).alpha(0.3).string()}`;
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
			return `0 0 2vw ${Color(col).alpha(0.5).string()}`;
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

export default class Theme {
	backgroundColor: string;
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

		return rules.join(' ');
	}

	static fromObject(obj: ThemeObject): Theme {
		const theme = new Theme();
		theme.backgroundColor = obj.background;
		theme.foregroundColor = obj.foreground;
		theme.id = obj.id;
		theme.name = obj.name;
		return theme;
	}

	static createDefault(): Theme {
		return Theme.fromObject({
			background: '#000000',
			foreground: '#b7b7b7',
			id: 'default',
			name: 'Default',
		});
	}
}
