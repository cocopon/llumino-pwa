// @flow

import React from 'react';

import ClassName from '../../misc/class-name';

const className = ClassName('calc', 'menu');
const itemClassName = ClassName('calc', 'menuItem');

type Props = {
	expanded: boolean,
	onItemClick: (itemId: string) => void,
};

type State = {
	action: 'show' | 'hide' | null,
};

export default class Menu extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);

		(this: any).onItemClick_ = this.onItemClick_.bind(this);

		this.state = {
			action: 'hide',
		};
	}

	static getDerivedStateFromProps(nextProps: Props, prevState: State): $Shape<State> {
		let action = null;
		
		if (!nextProps.expanded && prevState.action !== 'hide') {
			action = 'hide';
		} else if (nextProps.expanded && prevState.action !== 'show') {
			action = 'show';
		}

		return action ?
			{action} :
			{};
	}

	render() {
		const itemElems = [
			'copy',
			'paste',
			'history',
			'settings',
		].map((item) => {
			return (
				<div
					className={itemClassName()}
					key={item}
				>
					<div className={itemClassName('innerLayout')}>
						<button
							className={itemClassName('button')}
							data-id={item}
							onClick={this.onItemClick_}
						>
							{item}
						</button>
					</div>
				</div>
			);
		});

		const modifierMap: {[string]: boolean} = {};
		if (this.state.action) {
			modifierMap[this.state.action] = true;
		}

		return (
			<div className={className(modifierMap)}>
				{itemElems}
			</div>
		);
	}

	onItemClick_(e: SyntheticMouseEvent<HTMLButtonElement>) {
		const buttonElem = e.currentTarget;
		const itemId = buttonElem.dataset.id;
		this.props.onItemClick(itemId);
	}
}
