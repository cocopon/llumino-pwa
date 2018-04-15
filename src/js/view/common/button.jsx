// @flow

import React from 'react';

import ClassName from '../../misc/class-name';

const className = ClassName('common', 'button');

type Props = {
	onClick: () => void,
	title: string,
};

export default class Button extends React.Component<Props> {
	render() {
		return (
			<div
				className={className()}
				onClick={this.props.onClick}
			>
				<span className={className('title')}>
					{this.props.title}
				</span>
			</div>
		);
	}
}
