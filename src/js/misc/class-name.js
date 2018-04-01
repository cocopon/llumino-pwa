// @flow

type ModifierMap = {[string]: any};

function expandModifierMap(content: string, opt_modifierMap?: ModifierMap): string {
	const classNames: string[] = [content];

	if (opt_modifierMap) {
		const modifierMap = opt_modifierMap;
		const modifierNames = Object.keys(modifierMap);

		modifierNames.forEach((modifierName) => {
			if (modifierMap[modifierName]) {
				classNames.push(`${content}-${modifierName}`);
			}
		});
	}

	return classNames.join(' ');
}

export default (prefix: string, blockName: string) => {
	return (opt_elementNameOrModifierMap?: string | ModifierMap, opt_modifierMap?: ModifierMap): string => {
		if (!opt_elementNameOrModifierMap) {
			return `${prefix}-${blockName}`;
		}

		if (typeof(opt_elementNameOrModifierMap) === 'string') {
			const elementName = opt_elementNameOrModifierMap;
			return expandModifierMap(
				`${prefix}-${blockName}_${elementName}`,
				opt_modifierMap
			);
		}

		return expandModifierMap(
			`${prefix}-${blockName}`,
			opt_elementNameOrModifierMap
		);
	};
};
