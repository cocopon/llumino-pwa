// @flow

import React from 'react';
import ReactDom from 'react-dom';

import NumberFormatter from '../../misc/number-formatter';

import ClassName from '../../misc/class-name';
import InnerDisplay from './inner-display';

type Props = {
	displayNumber: number;
}

const className = ClassName('calc', 'display');

export default class Display extends React.Component<Props> {
	innerDisplay_: InnerDisplay;

	componentWillMount() {
		const elem = ReactDom.findDOMNode(this);
		if (!elem) {
			return;
		}

	}

	applyChanges_() {
		if (!this.innerDisplay_) {
			const elem = ReactDom.findDOMNode(this);
			if (!elem) {
				return;
			}

			const innerDisplay = new InnerDisplay();
			elem.appendChild(innerDisplay.element);
			this.innerDisplay_ = innerDisplay;
		}

		const text = NumberFormatter.format(this.props.displayNumber);
		this.innerDisplay_.updateText(text);
	}

	componentDidMount() {
		this.applyChanges_();
	}

	componentDidUpdate() {
		this.applyChanges_();
	}

	render() {
		const text = NumberFormatter.format(this.props.displayNumber);
		return (
			<div className={className()}/>
		);
	}
}
