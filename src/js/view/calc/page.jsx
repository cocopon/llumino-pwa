// @flow

import React from 'react';
import * as ReactRedux from 'react-redux';
import * as Redux from 'redux';

import * as CalcActionCreators from '../../action-creators/calc-action-creators';
import ClassName from '../../misc/class-name';
import NumberFormatter from '../../misc/number-formatter';
import ButtonGrid from './button-grid';

import type {CalcAction} from '../../actions/calc-actions';
import type {ButtonId} from '../../logic/button-id';
import type {CalcState} from '../../reducer/calc-reducer';
import type {RootState} from '../../reducer/root-reducer';

type Props = {
	pageState: CalcState,
	onGridButtonClick: (buttonId: ButtonId) => void,
};

const className = ClassName('calc', 'page');

class CalcPage extends React.Component<Props> {
	constructor(props: Props) {
		super(props);

		(this: any).onGridButtonClick_ = this.onGridButtonClick_.bind(this);
	}

	render() {
		const pageState = this.props.pageState;
		return (
			<div className={className()}>
				<div className={className('innerLayout')}>
					<div className={className('displayLayout')}>
						{NumberFormatter.format(pageState.calculator.displayNumber)}
					</div>
					<div className={className('gridLayout')}>
						<ButtonGrid
							onButtonClick={this.onGridButtonClick_}
						/>
					</div>
				</div>
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

export default ReactRedux.connect(mapStateToProps, mapDispatchToProps)(CalcPage);
