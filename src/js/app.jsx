// @flow

import React from 'react';
import * as ReactRedux from 'react-redux';
import * as Redux from 'redux';

import CalcPage from './view/calc/page';

type Props = {};

class App extends React.Component<Props> {
	render() {
		return (
			<div>
				<CalcPage/>
			</div>
		);
	}
}

export default App;
