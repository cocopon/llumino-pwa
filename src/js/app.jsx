// @flow

import React from 'react';
import * as ReactRedux from 'react-redux';
import * as Redux from 'redux';

import * as CommonActionCreators from './action-creators/common-action-creators';
import CalcPage from './view/calc/page';
import SettingPage from './view/setting/page';
import Snackbar from './view/common/snackbar';

import type {CommonAction} from './actions/common-actions';
import type {RootState} from './store/root';

type Props = {
	onReloadButtonClick: () => void,
	state: RootState,
};

class App extends React.Component<Props> {
	render() {
		const {pageId} = this.props.state.common;
		return (
			<div>
				<CalcPage/>
				<SettingPage
					visible={pageId === 'setting'}
				/>

				<Snackbar
					buttonTitle="Refresh"
					onButtonClick={this.props.onReloadButtonClick}
					text="Updates ready to install"
					visible={this.props.state.common.outdated}
				/>
			</div>
		);
	}
}

function mapStateToProps(state: RootState) {
	return {
		state,
	};
}

function mapDispatchToProps(dispatch: Redux.Dispatch<CommonAction>) {
	return {
		onReloadButtonClick() {
			dispatch(
				CommonActionCreators.reload(),
			);
		},
	};
}

export default ReactRedux.connect(mapStateToProps, mapDispatchToProps)(App);
