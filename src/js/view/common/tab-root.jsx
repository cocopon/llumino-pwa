// @flow

import * as React from 'react';

import ClassName from '../../misc/class-name';
import Page from './tab-page';

type ItemProps = {
	id: string,
	title: string,
};

type Props = {
	activeItemId: string,
	children: React.Node[],
	items: ItemProps[],
	onItemClick: (itemId: string) => void,
};

const className = ClassName('common', 'tab');
const itemClassName = ClassName('common', 'tabItem');
const EMPTY_HANDLER = () => {};

export class Root extends React.Component<Props> {
	constructor(props: Props) {
		super(props);

		(this: any).onItemClick_ = this.onItemClick_.bind(this);
	}

	render() {
		const itemElems = this.props.items.map((item) => {
			const active = (item.id === this.props.activeItemId);
			return (
				<div
					className={itemClassName({active})}
					key={item.id}
				>
					<button
						className={itemClassName('button')}
						data-id={item.id}
						onClick={this.onItemClick_}
						onTouchStart={EMPTY_HANDLER}
					>
						{item.title}
					</button>
				</div>
			);
		});
		const pageElems = this.props.children.map((child, index) => {
			const item = this.props.items[index];
			const active = (item.id === this.props.activeItemId);
			return (
				<Page
					active={active}
					key={item.id}
				>
					{child}
				</Page>
			);
		});
		return (
			<div className={className()}>
				<div className={className('itemsLayout')}>
					{itemElems}
				</div>
				<div className={className('pageLayout')}>
					{pageElems}
				</div>
			</div>
		);
	}

	onItemClick_(e: SyntheticMouseEvent<HTMLButtonElement>) {
		const elem = e.currentTarget;
		const itemId = elem.dataset.id;
		this.props.onItemClick(itemId);
	}
}

export {
	Page,
};
