// @flow

import * as React from 'react';

import ClassName from '../../misc/class-name';

type ListItemProps = {
	id: string,
	title: string,
};

type Props = {
	items: ListItemProps[],
	onItemClick: (itemId: string) => void,
};

const className = ClassName('common', 'list');
const itemClassName = ClassName('common', 'listItem');
const EMPTY_HANDLER = () => {};

export default class NavigationBar extends React.Component<Props> {
	constructor(props: Props) {
		super(props);

		(this: any).onItemClick_ = this.onItemClick_.bind(this);
	}

	render() {
		const itemElems = this.props.items.map((item) => {
			return (
				<div
					className={itemClassName()}
					key={item.id}
				>
					<button
						className={itemClassName('button')}
						data-id={item.id}
						onClick={this.onItemClick_}
						onTouchStart={EMPTY_HANDLER}
					>
						<span className={itemClassName('icon')}>
						</span>
						<span className={itemClassName('title')}>
							{item.title}
						</span>
					</button>
				</div>
			);
		});
		return (
			<div className={className()}>
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
