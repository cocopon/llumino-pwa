// @flow

import * as React from 'react';

import ClassName from '../../misc/class-name';

const className = ClassName('common', 'tabPage');

type Props = {
	active: boolean,
	children?: React.Node,
};

export default class Page extends React.Component<Props> {
	render() {
		return (
			<div className={className({active: this.props.active})}>
				{this.props.children}
			</div>
		);
	};
}
