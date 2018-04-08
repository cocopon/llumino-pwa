// @flow

import React from 'react';
import * as ReactRedux from 'react-redux';
import * as Redux from 'redux';

import * as CommonActionCreators from '../../action-creators/common-action-creators';
import ClassName from '../../misc/class-name';
import Theme from '../../model/theme';
import Themes from '../../model/themes';
import ThemeList from './theme-list';

import type {RootState} from '../../reducer/root-reducer';

type Props = {
	onThemeItemClick: (theme: Theme) => void,
	themes: Theme[],
};

const className = ClassName('setting', 'themePage');

class ThemePage extends React.Component<Props> {
	render() {
		return (
			<div className={className()}>
				<ThemeList
					onItemClick={this.props.onThemeItemClick}
					themes={this.props.themes}
				/>
			</div>
		);
	}
}

function mapStateToProps(state: RootState) {
	return {
		themes: Themes,
	};
}

function mapDispatchToProps(dispatch: Redux.Dispatch<*>) {
	return {
		onThemeItemClick(theme: Theme) {
			dispatch(
				CommonActionCreators.changeTheme(theme),
			);
		},
	};
}

export default ReactRedux.connect(mapStateToProps, mapDispatchToProps)(ThemePage);
