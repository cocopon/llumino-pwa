// @flow

import ClassName from '../../misc/class-name';

const className = ClassName('calc', 'display');

function splitDigits(digits: string): string[] {
	const result: string[] = [];
	for (let i = 0; i < digits.length; i++) {
		result.push(digits.charAt(i));
	}
	return result;
}

class Digit {
	index: number = -1;
	left: number = 0;
	new: boolean = true;
	deletionDate: ?Date = null;
	text: string;
	top: number = 0;

	constructor(text: string) {
		this.text = text;
	}
}

type TransitionResult = {
	nextDigits: Digit[],
	unusedDigits: Digit[],
};

function isSeparator(text: string): boolean {
	// TODO: Loclaize
	return text === ',';
}

function findReusableOldDigit(oldDigits: Digit[], text: string): number {
	for (let i = 0; i < oldDigits.length; i++) {
		if (oldDigits[i].text === text) {
			return i;
		}
	}
	return -1;
}

function transitDigits(newDigitsText: string, oldDigits: Digit[]): TransitionResult {
	oldDigits = Array.prototype.slice.call(oldDigits);
	oldDigits.forEach((digit) => {
		digit.new = false;
	});

	const oldSeparators = oldDigits.filter((digit) => {
		return isSeparator(digit.text);
	});
	const oldSeparatorCount = oldSeparators.length;

	const nextTexts = splitDigits(newDigitsText);
	const newSeparatorCount = nextTexts.filter(isSeparator).length;

	let separatorIndex: number = 0;
	const nextDigits = nextTexts.map((text, index) => {
		let reusableIndex = -1;
		if (isSeparator(text)) {
			const reversedIndex = (newSeparatorCount - separatorIndex) - 1;
			if (reversedIndex < oldSeparatorCount) {
				reusableIndex = findReusableOldDigit(oldDigits, text);
			}
			++separatorIndex;
		} else {
			reusableIndex = findReusableOldDigit(oldDigits, text);
		}
		if (reusableIndex >= 0) {
			return oldDigits.splice(reusableIndex, 1)[0];
		}

		const newDigit = new Digit(text);
		newDigit.index = index;
		return newDigit;
	});

	return {
		nextDigits,
		unusedDigits: oldDigits,
	};
}

type DisplayDigit = {
	digit: Digit,
	element: HTMLElement,
};

const DELETION_DELAY = 1000;

const AVAILABLE_DIGITS: string[] = [
	'0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
	',', '.',
	'+', '-',
	'N', 'a',
	'E', 'o', 'r',
];

export default class InnerDisplay {
	elem_: HTMLElement;
	displayDigits_: DisplayDigit[] = [];
	ddWidthMap_: {[string]: number} = {};
	needsRebuildingWidthMap_: boolean = true;
	outdatedDisplayDigits_: DisplayDigit[] = [];
	placeholderElem_: HTMLElement;
	text_: string = '';

	constructor() {
		const elem = document.createElement('div');
		elem.classList.add(className('digitsLayout'));
		this.elem_ = elem;

		const phElem = document.createElement('div');
		phElem.classList.add(
			...className('digit', {placeholder: true}).split(' '),
		);
		this.elem_.appendChild(phElem);
		this.placeholderElem_ = phElem;

		window.addEventListener(
			'orientationchange',
			this.onWindowOrientationChange_.bind(this),
		);
		window.addEventListener(
			'resize',
			this.onWindowResize_.bind(this),
		);
	}

	buildDisplayDigitsWidthMap_() {
		this.ddWidthMap_ = {};
		AVAILABLE_DIGITS.forEach((text) => {
			this.placeholderElem_.textContent = text;
			this.ddWidthMap_[text] = this.placeholderElem_.getBoundingClientRect().width;
		});
	}

	updateText(text: string) {
		const shouldUpdate = this.needsRebuildingWidthMap_ ||
			(this.text_ !== text);
		if (!shouldUpdate) {
			return;
		}

		if (this.needsRebuildingWidthMap_) {
			this.buildDisplayDigitsWidthMap_();
		}

		const {
			nextDigits,
			unusedDigits,
		} = transitDigits(text, this.displayDigits_.map((dd) => {
			return dd.digit;
		}));

		const displayWidth = this.elem_.getBoundingClientRect().width;
		const totalWidth = nextDigits.reduce((total, digit) => {
			return total + this.ddWidthMap_[digit.text];
		}, 0);
		let x = displayWidth - totalWidth;
		nextDigits.forEach((digit, index) => {
			const w = this.ddWidthMap_[digit.text];
			digit.left = x;
			digit.top = 0;

			x += w;
		});

		// Layout new digits
		const prevDigitElems = this.displayDigits_.map((dd) => {
			return dd.element;
		});
		const nextDigitElems = nextDigits.map((digit) => {
			let digitElem;
			if (!digit.new) {
				digitElem = prevDigitElems[digit.index];
			} else {
				digitElem = document.createElement('span');
				digitElem.classList.add(
					...className('digit', {show: true}).split(' '),
				);
				digitElem.textContent = digit.text;
				this.elem_.appendChild(digitElem);
			}

			digitElem.style.left = `${digit.left}px`;
			digitElem.style.top = `${digit.top}px`;

			return digitElem;
		});

		// Hide unused digits
		const now = new Date();
		unusedDigits.forEach((digit, index) => {
			digit.deletionDate = now;

			const digitElem = prevDigitElems[digit.index];
			const delay = (unusedDigits.length - index - 1) * 0.02;
			digitElem.style.animationDelay = `${delay}s`;
			digitElem.classList.add(
				...className('digit', {hide: true}).split(' '),
			);
		});

		// Remove outdated digits
		this.outdatedDisplayDigits_ = this.outdatedDisplayDigits_.filter((dd) => {
			const {deletionDate} = dd.digit;
			if (!deletionDate) {
				return true;
			}

			const shouldRemove = (now.getTime() - deletionDate.getTime() > DELETION_DELAY);
			if (shouldRemove) {
				dd.element.remove();
			}
			return !shouldRemove;
		});

		// Append outdated digits
		this.outdatedDisplayDigits_.push(
			...unusedDigits.map((digit) => {
				return {
					digit,
					element: this.displayDigits_[digit.index].element,
				};
			}),
		);

		// Store new digits
		this.displayDigits_ = nextDigits.map((digit, index) => {
			digit.index = index;
			return {
				digit,
				element: nextDigitElems[index],
			};
		});

		this.text_ = text;
	}

	get element(): HTMLElement {
		return this.elem_;
	}

	onWindowOrientationChange_() {
		// Delay resizing because browser cannot compute the display element size correctly
		setTimeout(() => {
			this.needsRebuildingWidthMap_ = true;
			this.updateText(this.text_);
		}, 300);
	}

	onWindowResize_() {
		this.needsRebuildingWidthMap_ = true;
		this.updateText(this.text_);
	}
}
