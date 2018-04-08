// @flow

import React from 'react';

import ClassName from '../../misc/class-name';

const className = ClassName('calc', 'menu');
const itemClassName = ClassName('calc', 'menuItem');

type ItemProps = {
	disabled?: boolean,
	id: string,
	title: string,
};

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
			{id: 'copy', title: 'n/a', disabled: true},
			{id: 'paste', title: 'n/a', disabled: true},
			{id: 'history', title: 'n/a', disabled: true},
			{id: 'settings', title: 'Settings'},
		].map((item: ItemProps) => {
			return (
				<div
					className={itemClassName()}
					key={item.id}
				>
					<div className={itemClassName('innerLayout')}>
						<button
							className={itemClassName('button')}
							disabled={!!item.disabled}
							data-id={item.id}
							onClick={this.onItemClick_}
						>
							{item.title}
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
