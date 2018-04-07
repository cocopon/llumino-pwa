// @flow

import React from 'react';
import ReactDom from 'react-dom';

import NumberFormatter from '../../misc/number-formatter';

import ClassName from '../../misc/class-name';
import InnerDisplay from './inner-display';

type Props = {
	displayNumber: number;
	onClick: () => void;
}

const className = ClassName('calc', 'display');
const EMPTY_HANDLER = () => {};

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
			const elem = ((ReactDom.findDOMNode(this): any): Element);
			if (!elem) {
				return;
			}
			const innerElem = elem.children[0];

			const innerDisplay = new InnerDisplay();
			innerElem.appendChild(innerDisplay.element);
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
			<button
				className={className()}
				onClick={this.props.onClick}
				onTouchStart={EMPTY_HANDLER}
			>
				<div className={className('innerLayout')}>
				</div>
			</button>
		);
	}
}
