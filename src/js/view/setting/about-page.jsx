// @flow

import React from 'react';
import * as ReactRedux from 'react-redux';
import * as Redux from 'redux';

import * as SettingActionCreators from '../../action-creators/setting-action-creators';
import ClassName from '../../misc/class-name';
import Constants from '../../misc/constants';
import List from '../common/list';

import type {RootState} from '../../reducer/root-reducer';

type Props = {
};

const className = ClassName('setting', 'aboutPage');

class AboutPage extends React.Component<Props> {
	render() {
		return (
			<div className={className()}>
				<p className={className('title')}>
					Llumino PWA {Constants.version}
				</p>
				<p className={className('detail')}>
					Llumino is a luminary calculator that makes calculation more fun.
					This was originally developed as an iOS native app, and now re-built with the latest web technology. This is also a technical demonstration of PWA (Progressive Web App).
				</p>
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
