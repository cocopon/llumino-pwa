// @flow

import React from 'react';

import ClassName from '../../misc/class-name';

type Props = {
	onClick: () => void,
	title: string,
};

const className = ClassName('common', 'button');

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
