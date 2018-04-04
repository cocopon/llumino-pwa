// @flow

import React from 'react';

import NumberFormatter from '../../misc/number-formatter';

import ClassName from '../../misc/class-name';

type Props = {
	displayNumber: number;
}

const className = ClassName('calc', 'display');

export default class Display extends React.Component<Props> {
	render() {
		const text = NumberFormatter.format(this.props.displayNumber);
		return (
			<div className={className()}>
				{text}
			</div>
		);
	}
}
