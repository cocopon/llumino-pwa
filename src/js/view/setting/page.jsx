// @flow

import React from 'react';
import * as ReactRedux from 'react-redux';
import * as Redux from 'redux';

import * as SettingActionCreators from '../../action-creators/setting-action-creators';
import ClassName from '../../misc/class-name';
import AppBar from '../common/app-bar';
import * as Tab from '../common/tab-root';
import AboutPage from './about-page';
import ThemePage from './theme-page';

import type {RootState} from '../../store/root';
import type {SettingState} from '../../store/setting';

type Props = {
	onCloseButtonClick: () => void,
	onTabItemClick: (itemId: string) => void,
	visible: boolean,
	pageState: SettingState,
};

type State = {
	action: 'show' | 'hide' | null,
};

const EMPTY_HANDLER = () => {};
const className = ClassName('setting', 'page');

class SettingPage extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);

		this.state = {
			action: null,
		};
	}

	UNSAFE_componentWillReceiveProps(newProps: Props) {
		const oldVisible = this.props.visible;
		const newVisible = newProps.visible;

		if (oldVisible && !newVisible) {
			this.setState({
				action: 'hide',
			});
		} else if (!oldVisible && newVisible) {
			this.setState({
				action: 'show',
			});
		}
	}

	render() {
		const {pageState} = this.props;
		const modifierMap: {[string]: boolean} = {};
		if (this.state.action) {
			modifierMap[this.state.action] = true;
		}

		return (
			<div className={className(modifierMap)}>
				<div className={className('appBarLayout')}>
					<AppBar title="Settings">
						<button
							className="common-appBarButton"
							onClick={this.props.onCloseButtonClick}
							onTouchStart={EMPTY_HANDLER}
						>
							Close
						</button>
					</AppBar>
				</div>
				<div className={className('tabLayout')}>
					<Tab.Root
						activeItemId={pageState.tabId}
						items={[
							{id: 'theme', title: 'Themes'},
							{id: 'about', title: 'About'},
						]}
						onItemClick={this.props.onTabItemClick}
					>
						<ThemePage/>
						<AboutPage/>
					</Tab.Root>
				</div>
			</div>
		);
	}
}

function mapStateToProps(state: RootState) {
	return {
		pageState: state.setting,
	};
}

function mapDispatchToProps(dispatch: Redux.Dispatch<*>) {
	return {
		onCloseButtonClick() {
			dispatch(
				SettingActionCreators.closePage(),
			);
		},
		onTabItemClick(itemId: string) {
			dispatch(
				SettingActionCreators.changeTab(itemId),
			);
		},
	};
}

export default ReactRedux.connect(mapStateToProps, mapDispatchToProps)(SettingPage);
