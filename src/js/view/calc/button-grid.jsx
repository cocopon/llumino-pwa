// @flow

import React from 'react';

import ClassName from '../../misc/class-name';
import MathUtil from '../../misc/math-util';
import EnergyField from '../../model/energy/field';
import MoireSource from '../../model/energy/moire-source';

import type {ButtonId} from '../../model/button-id';

const H_BUTTON_COUNT = 4;
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
	energyElems_: HTMLElement[] = [];
	shouldDispose_: boolean = false;
	energyCache_: number[] = [];
	energyField_: EnergyField = new EnergyField();

	constructor(props: Props) {
		super(props);

		(this: any).onButtonClick_ = this.onButtonClick_.bind(this);
		(this: any).onTick_ = this.onTick_.bind(this);
	}

	initEnergyField_() {
		this.onTick_();
	}

	disposeEnergyField_() {
		this.shouldDispose_ = true;
	}

	componentDidMount() {
		this.initEnergyField_();
	}

	componentWillUnmount() {
		this.disposeEnergyField_();
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
						data-index={index}
						onClick={this.onButtonClick_}
					>
						<span
							className={className('buttonEnergy')}
							ref={(buttonElem) => {
								if (buttonElem) {
									this.energyElems_[index] = buttonElem;
								}
							}}
						/>
						<span className={className('buttonText')}>
							{text}
						</span>
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
		const buttonElem = e.currentTarget;
		const buttonId = (buttonElem.dataset.buttonId: any);
		this.props.onButtonClick(buttonId);

		const index = Number(buttonElem.dataset.index);
		if (!isNaN(index)) {
			const y = Math.floor(index / H_BUTTON_COUNT);
			const x = index % H_BUTTON_COUNT;
			const source = new MoireSource(x, y);
			this.energyField_.add(source);
		}
	}

	onTick_() {
		this.energyField_.update();

		this.energyElems_.forEach((energyElem, index) => {
			if (!energyElem) {
				return;
			}

			const y = Math.floor(index / H_BUTTON_COUNT);
			const x = index % H_BUTTON_COUNT;
			const energy = this.energyField_.getEnergy(x, y);
			if (energy !== this.energyCache_[index]) {
				energyElem.style.opacity = `${energy}`;
			}
			this.energyCache_[index] = energy;
		});

		if (!this.shouldDispose_) {
			requestAnimationFrame(this.onTick_);
		}
	}
}
