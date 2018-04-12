// @flow

import React from 'react';
import ReactDom from 'react-dom';

import NumberFormatter from '../../misc/number-formatter';
import ClassName from '../../misc/class-name';
import Calculator from '../../model/calculator/calculator';
import InnerDisplay from './inner-display';

type Props = {
	dimmed: boolean,
	calculator: Calculator,
	onClick: () => void,
	shakeCount: number,
};

type State = {
	shouldShake: boolean,
};

const className = ClassName('calc', 'display');
const EMPTY_HANDLER = () => {};

function buildText(calc: Calculator): string {
	if (calc.error) {
		return 'Error';
	}

	const formattedNumber = NumberFormatter.format(calc.displayNumber);
	const lastBuffer = calc.inputBuffers[calc.inputBuffers.length - 1];
	return (lastBuffer === '.') ?
		`${formattedNumber}.` :
		formattedNumber;
}

export default class Display extends React.Component<Props, State> {
	innerDisplay_: InnerDisplay;

	constructor(props: Props) {
		super(props);

		this.state = {
			shouldShake: false,
		};
	}

	componentWillMount() {
		const elem = ReactDom.findDOMNode(this);
		if (!elem) {
			return;
		}
	}

	UNSAFE_componentWillReceiveProps(nextProps: Props) {
		this.setState({
			shouldShake: (nextProps.shakeCount !== this.props.shakeCount),
		});
	}

	applyChanges_() {
		const elem = ((ReactDom.findDOMNode(this): any): Element);
		if (!elem) {
			return;
		}
		const innerElem = elem.children[0];

		// Update inner display
		if (!this.innerDisplay_) {
			const innerDisplay = new InnerDisplay();
			innerElem.appendChild(innerDisplay.element);
			this.innerDisplay_ = innerDisplay;
		}

		const calc = this.props.calculator;
		this.innerDisplay_.updateText(buildText(calc));

		// Handle shake
		if (this.state.shouldShake) {
			const modifierClass = className('innerLayout', {shake: true}).split(' ')[1];
			innerElem.classList.remove(modifierClass);
			innerElem.offsetHeight;  // Force-invoke reflow
			innerElem.classList.add(modifierClass);
		}
	}

	componentDidMount() {
		this.applyChanges_();
	}

	componentDidUpdate() {
		this.applyChanges_();
	}

	render() {
		return (
			<button
				className={className({dimmed: this.props.dimmed})}
				onClick={this.props.onClick}
				onTouchStart={EMPTY_HANDLER}
			>
				<div className={className('innerLayout')}>
				</div>
				<div className={className('noteLayout')}>
					NOTE: This is a web version of Llumino for a technical demonstration of PWA (Progressive Web App).
				</div>
			</button>
		);
	}
}
