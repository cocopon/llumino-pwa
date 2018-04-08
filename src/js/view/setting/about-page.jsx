// @flow

import React from 'react';
import * as ReactRedux from 'react-redux';
import * as Redux from 'redux';

import * as SettingActionCreators from '../../action-creators/setting-action-creators';
import ClassName from '../../misc/class-name';
import List from '../common/list';

import type {RootState} from '../../reducer/root-reducer';

type Props = {
};

const className = ClassName('setting', 'aboutPage');

class AboutPage extends React.Component<Props> {
	render() {
		return (
			<div className={className()}>
				About
			</div>
		);
	}
}

function mapStateToProps(state: RootState) {
	return {
	};
}

function mapDispatchToProps(dispatch: Redux.Dispatch<*>) {
	return {
	};
}

export default ReactRedux.connect(mapStateToProps, mapDispatchToProps)(AboutPage);
