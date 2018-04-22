// @flow

import * as React from 'react';

import ClassName from '../../misc/class-name';

type Props = {
	checked: boolean,
	onChange: (checked: boolean) => void,
	title: string,
};

const className = ClassName('common', 'checkboxField');

export default class CheckboxField extends React.Component<Props> {
	constructor(props: Props) {
		super(props);

		(this: any).onInputChange_ = this.onInputChange_.bind(this);
	}

	render() {
		return (
			<div className={className()}>
				<label className={className('label')}>
					<input
						checked={this.props.checked}
						className={className('input')}
						onChange={this.onInputChange_}
						type="checkbox"
					/>
					<div className={className('box')}/>
					<div className={className('text')}>
						{this.props.title}
					</div>
				</label>
			</div>
		);
	};

	onInputChange_(e: SyntheticInputEvent<HTMLInputElement>) {
		const inputElem = e.currentTarget;
		this.props.onChange(inputElem.checked);
	}
}
