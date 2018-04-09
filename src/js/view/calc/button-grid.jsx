// @flow

import React from 'react';

import ClassName from '../../misc/class-name';
import MathUtil from '../../misc/math-util';
import ButtonIdUtil from '../../model/button-id';
import EnergyField from '../../model/energy/field';
import MoireSource from '../../model/energy/moire-source';

import type {ButtonId} from '../../model/button-id';

const H_BUTTON_COUNT = 4;
const BUTTON_IDS: ButtonId[] = [
	'c', 'bs', '%', '/',
	'7', '8',  '9', '*',
	'4', '5',  '6', '-',
	'1', '2',  '3', '+',
	'0', '.',  '0', '=',
];
const BUTTON_ID_TO_TEXT_MAP: {[ButtonId]: string} = {
	'bs': 'BS',
	'c': 'C',
	'-': '−',
	'*': '×',
	'/': '÷',
};

type Props = {
	inefficientButtonIds: ButtonId[],
	onButtonClick: (buttonId: ButtonId) => void,
};

const className = ClassName('calc', 'buttonGrid');
const EMPTY_HANDLER = () => {};

export default class ButtonGrid extends React.Component<Props> {
	buttonElems_: HTMLButtonElement[] = [];
	energyElems_: HTMLElement[] = [];
	shouldDispose_: boolean = false;
	energyCache_: number[] = [];
	energyField_: EnergyField = new EnergyField();

	constructor(props: Props) {
		super(props);

		(this: any).onButtonClick_ = this.onButtonClick_.bind(this);
		(this: any).onButtonKeyDown_ = this.onButtonKeyDown_.bind(this);
		(this: any).onDocumentKeyDown_ = this.onDocumentKeyDown_.bind(this);
		(this: any).onDocumentKeyUp_ = this.onDocumentKeyUp_.bind(this);
		(this: any).onTick_ = this.onTick_.bind(this);

		document.addEventListener('keydown', this.onDocumentKeyDown_);
		document.addEventListener('keyup', this.onDocumentKeyUp_);
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

		document.removeEventListener('keydown', this.onDocumentKeyDown_);
		document.removeEventListener('keyup', this.onDocumentKeyUp_);
	}

	isInefficientButton_(buttonId: ButtonId): boolean {
		return this.props.inefficientButtonIds.indexOf(buttonId) >= 0;
	}

	render() {
		const buttonElems = BUTTON_IDS.map((buttonId, index) => {
			const text = BUTTON_ID_TO_TEXT_MAP[buttonId] || buttonId;
			return (
				<div
					className={className('buttonLayout')}
					key={index}
				>
					<div className={className('buttonInnerLayout')}>
						<button
							className={className('button', {
								inefficient: this.isInefficientButton_(buttonId),
							})}
							data-button-id={buttonId}
							data-index={index}
							onClick={this.onButtonClick_}
							onKeyDown={this.onButtonKeyDown_}
							onTouchStart={EMPTY_HANDLER}
							ref={(elem) => {
								if (elem) {
									this.buttonElems_[index] = elem;
								}
							}}
						>
							<span
								className={className('buttonEnergy')}
								ref={(elem) => {
									if (elem) {
										this.energyElems_[index] = elem;
									}
								}}
							/>
							<span className={className('buttonText')}>
								{text}
							</span>
						</button>
					</div>
				</div>
			);
		});
		return (
			<div className={className()}>
				{buttonElems}
			</div>
		);
	}

	handleButtonClick_(buttonId: ButtonId) {
		this.props.onButtonClick(buttonId);

		const index = BUTTON_IDS.indexOf(buttonId);
		if (index < 0) {
			return;
		}

		if (!this.isInefficientButton_(buttonId)) {
			const y = Math.floor(index / H_BUTTON_COUNT);
			const x = index % H_BUTTON_COUNT;
			const source = new MoireSource(x, y);
			this.energyField_.add(source);
		}
	}

	onButtonClick_(e: SyntheticEvent<HTMLButtonElement>) {
		const buttonElem = e.currentTarget;
		const buttonId = (buttonElem.dataset.buttonId: any);
		this.handleButtonClick_(buttonId);
	}

	onButtonKeyDown_(e: SyntheticKeyboardEvent<HTMLButtonElement>) {
		e.preventDefault();
	}

	updateButtonActive_(index: number, active: boolean) {
		const modifierClassName = className('button', {active: true}).split(' ')[1];
		const buttonElem = this.buttonElems_[index];

		if (active) {
			buttonElem.classList.add(modifierClassName);
		} else {
			buttonElem.classList.remove(modifierClassName);
		}
	}

	onDocumentKeyDown_(e: KeyboardEvent) {
		const buttonId = ButtonIdUtil.fromKey(e.key, e.keyCode);
		if (buttonId) {
			const index = BUTTON_IDS.indexOf(buttonId);
			this.updateButtonActive_(index, true);
		}
	}

	onDocumentKeyUp_(e: KeyboardEvent) {
		const buttonId = ButtonIdUtil.fromKey(e.key, e.keyCode);
		if (buttonId) {
			this.handleButtonClick_(buttonId);

			const index = BUTTON_IDS.indexOf(buttonId);
			this.updateButtonActive_(index, false);
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
				energyElem.style.opacity = `${energy * MathUtil.random(0.9, 1)}`;
			}
			this.energyCache_[index] = energy;
		});

		if (!this.shouldDispose_) {
			requestAnimationFrame(this.onTick_);
		}
	}
}
