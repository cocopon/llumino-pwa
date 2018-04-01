// @flow

import React from 'react';
import * as ReactRedux from 'react-redux';
import * as Redux from 'redux';

import * as CalcActionCreators from './action-creators/calc-action-creators';
import ButtonGrid from './view/button-grid';

import type {ButtonId} from './logic/button-id';
import type {RootState} from './reducer/root-reducer';

type Props = {
	onGridButtonClick: (buttonId: ButtonId) => void,
};

class App extends React.Component<Props> {
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
		this.props.onGridButtonClick(buttonId);
	}
}

function mapStateToProps(state: RootState): $Shape<Props> {
	return {};
}

function mapDispatchToProps(dispatch: Redux.Dispatch<*>): $Shape<Props> {
	return {
		onGridButtonClick(buttonId: ButtonId) {
			dispatch(
				CalcActionCreators.pushButton(buttonId)
			);
		}
	};
}

export default ReactRedux.connect(mapStateToProps, mapDispatchToProps)(App);
