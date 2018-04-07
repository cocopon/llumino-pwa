// @flow

import React from 'react';
import * as ReactRedux from 'react-redux';
import * as Redux from 'redux';

import * as CalcActionCreators from '../../action-creators/calc-action-creators';
import ClassName from '../../misc/class-name';
import ButtonGrid from './button-grid';
import Display from './display';
import Menu from './menu';

import type {CalcAction} from '../../actions/calc-actions';
import type {ButtonId} from '../../model/button-id';
import type {CalcState} from '../../reducer/calc-reducer';
import type {RootState} from '../../reducer/root-reducer';

type Props = {
	pageState: CalcState,
	onDisplayClick: () => void,
	onMenuItemClick: (itemId: string) => void,
	onGridButtonClick: (buttonId: ButtonId) => void,
};

const className = ClassName('calc', 'page');

class CalcPage extends React.Component<Props> {
	constructor(props: Props) {
		super(props);

		(this: any).onDisplayClick_ = this.onDisplayClick_.bind(this);
		(this: any).onMenuItemClick_ = this.onMenuItemClick_.bind(this);
		(this: any).onGridButtonClick_ = this.onGridButtonClick_.bind(this);
	}

	render() {
		const pageState = this.props.pageState;
		return (
			<div className={className()}>
				<div className={className('innerLayout')}>
					<div className={className('displayLayout')}>
						<Display
							displayNumber={pageState.calculator.displayNumber}
							onClick={this.onDisplayClick_}
						/>
						<div className={className('menuLayout')}>
							<Menu
								expanded={pageState.menuExpanded}
								onItemClick={this.onMenuItemClick_}
							/>
						</div>
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

	onDisplayClick_() {
		this.props.onDisplayClick();
	}

	onMenuItemClick_(itemId: string) {
		this.props.onMenuItemClick(itemId);
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
		onDisplayClick() {
			dispatch(
				CalcActionCreators.toggleMenu(),
			);
		},
		onMenuItemClick(itemId: string) {
			dispatch(
				CalcActionCreators.selectMenu(itemId),
			);
		},
		onGridButtonClick(buttonId: ButtonId) {
			dispatch(
				CalcActionCreators.pushButton(buttonId),
			);
		},
	};
}

export default ReactRedux.connect(mapStateToProps, mapDispatchToProps)(CalcPage);
