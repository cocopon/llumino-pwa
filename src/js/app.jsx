// @flow

import React from 'react';

import ButtonGrid from './view/button-grid';

import type {ButtonId} from './logic/button-id';

type Props = {
};

export default class App extends React.Component<Props> {
	constructor(props: Props) {
		super(props);

		(this: any).onGridButtonClick_ = this.onGridButtonClick_.bind(this);
	}

	render() {
		return (
			<ButtonGrid
				onButtonClick={this.onGridButtonClick_}
			/>
		);
	}

	onGridButtonClick_(buttonId: ButtonId) {
		console.log(buttonId);
	}
}
