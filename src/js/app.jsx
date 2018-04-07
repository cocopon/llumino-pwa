// @flow

import React from 'react';
import * as ReactRedux from 'react-redux';
import * as Redux from 'redux';

import CalcPage from './view/calc/page';
import SettingPage from './view/setting/page';

import type {RootState} from './reducer/root-reducer';

type Props = {
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
			</div>
		);
	}
}

function mapStateToProps(state: RootState) {
	return {
		state,
	};
}

export default ReactRedux.connect(mapStateToProps)(App);
