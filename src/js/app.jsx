// @flow

import React from 'react';
import * as ReactRedux from 'react-redux';
import * as Redux from 'redux';

import * as CalcActionCreators from './action-creators/calc-action-creators';
import ButtonGrid from './view/button-grid';

import type {CalcAction} from './actions/calc-actions';
import type {ButtonId} from './logic/button-id';
import type {CalcState} from './reducer/calc-reducer';
import type {RootState} from './reducer/root-reducer';

type Props = {
	pageState: CalcState,
	onGridButtonClick: (buttonId: ButtonId) => void,
};

class App extends React.Component<Props> {
	constructor(props: Props) {
		super(props);

		(this: any).onGridButtonClick_ = this.onGridButtonClick_.bind(this);
	}

	render() {
		const pageState = this.props.pageState;
		return (
			<div>
				<div>
					{pageState.calculator.answer_}
				</div>
				<div>
					{pageState.calculator.inputBuffers_.join(',')}
				</div>
				<ButtonGrid
					onButtonClick={this.onGridButtonClick_}
				/>
			</div>
		);
	}

	onGridButtonClick_(buttonId: ButtonId) {
		this.props.onGridButtonClick(buttonId);
	}
}

function mapStateToProps(state: RootState) {
	return {
		pageState: state.calc,
	};
}

function mapDispatchToProps(dispatch: Redux.Dispatch<CalcAction>) {
	return {
		onGridButtonClick(buttonId: ButtonId): void {
			dispatch(
				CalcActionCreators.pushButton(buttonId)
			);
		},
	};
}

export default ReactRedux.connect(mapStateToProps, mapDispatchToProps)(App);
