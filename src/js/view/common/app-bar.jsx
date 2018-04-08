// @flow

import * as React from 'react';

import ClassName from '../../misc/class-name';

const className = ClassName('common', 'appBar');

type Props = {
	children?: React.Node,
	title: string,
};

export default class AppBar extends React.Component<Props> {
	render() {
		return (
			<div className={className()}>
				<div className={className('title')}>
					{this.props.title}
				</div>
				<div className={className('itemsLayout')}>
					{this.props.children}
				</div>
			</div>
		);
	}
}
