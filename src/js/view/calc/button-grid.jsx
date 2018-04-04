// @flow

import React from 'react';

import ClassName from '../../misc/class-name';

import type {ButtonId} from '../../model/button-id';

const BUTTON_IDS: ButtonId[] = [
	'c', '0', '0', '/',
	'7', '8', '9', '*',
	'4', '5', '6', '-',
	'1', '2', '3', '+',
	'0', '.', '0', '=',
];
const BUTTON_ID_TO_TEXT_MAP: {[ButtonId]: string} = {
	'c': 'C',
	'-': '−',
	'*': '×',
	'/': '÷',
};

type Props = {
	onButtonClick: (buttonId: ButtonId) => void,
};

const className = ClassName('calc', 'buttonGrid');

export default class ButtonGrid extends React.Component<Props> {
	constructor(props: Props) {
		super(props);

		(this: any).onButtonClick_ = this.onButtonClick_.bind(this);
	}

	render() {
		const buttonElems = BUTTON_IDS.map((buttonId, index) => {
			const text = BUTTON_ID_TO_TEXT_MAP[buttonId] || buttonId;
			return (
				<div
					className={className('buttonLayout')}
					key={index}
				>
					<button
						className={className('button')}
						data-button-id={buttonId}
						onClick={this.onButtonClick_}
					>
						{text}
					</button>
				</div>
			);
		});
		return (
			<div className={className()}>
				{buttonElems}
			</div>
		);
	}

	onButtonClick_(e: SyntheticEvent<HTMLButtonElement>) {
		const buttonId = (e.currentTarget.dataset.buttonId: any);
		this.props.onButtonClick(buttonId);
	}
}
