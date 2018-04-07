// @flow

import React from 'react';
import * as ReactRedux from 'react-redux';
import * as Redux from 'redux';

import * as SettingActionCreators from '../../action-creators/setting-action-creators';
import ClassName from '../../misc/class-name';
import List from '../common/list';
import NavigationBar from '../common/navigation-bar';

import type {RootState} from '../../reducer/root-reducer';

type Props = {
	onCloseButtonClick: () => void,
	onListItemClick: (itemId: string) => void,
	visible: boolean,
};

type State = {
	action: 'show' | 'hide' | null,
};

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
		const modifierMap: {[string]: boolean} = {};
		if (this.state.action) {
			modifierMap[this.state.action] = true;
		}

		return (
			<div className={className(modifierMap)}>
				<NavigationBar
					title="Settings"
				>
					<button
						onClick={this.props.onCloseButtonClick}
					>
						Close
					</button>
				</NavigationBar>
				<List
					items={[
						{id: 'theme', title: 'Themes'},
						{id: 'font', title: 'Fonts'},
					]}
					onItemClick={this.props.onListItemClick}
				>
				</List>
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
		onCloseButtonClick() {
			dispatch(
				SettingActionCreators.closePage(),
			);
		},
		onListItemClick(itemId: string) {
			dispatch(
				SettingActionCreators.showSubpage(itemId),
			);
		},
	};
}

export default ReactRedux.connect(mapStateToProps, mapDispatchToProps)(SettingPage);
