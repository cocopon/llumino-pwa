// @flow

import * as React from 'react';

import ClassName from '../../misc/class-name';

const className = ClassName('common', 'snackbar');

type Action = 'show' | 'hide';

type Props = {
	buttonTitle?: string,
	onButtonClick?: () => void,
	text: string,
	visible: boolean,
};

type State = {
	action: ?Action,
};

export default class Snackbar extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);

		const action = props.visible ? 'show' : null;
		this.state = {
			action,
		};
	}

	UNSAFE_componentWillReceiveProps(nextProps: Props) {
		if (this.props.visible !== nextProps.visible) {
			const action = nextProps.visible ?
					'show' :
					'hide';
			this.setState({
				action,
			});
		}
	}

	render() {
		const modifierMap: {[string]: boolean} = {};
		if (this.state.action) {
			modifierMap[this.state.action] = true;
		}

		const buttonElem = this.props.onButtonClick ?
			(
				<div className={className('buttonLayout')}>
					<button
						className={className('button')}
						onClick={this.props.onButtonClick}
					>
						{this.props.buttonTitle}
					</button>
				</div>
			) : null;

		return (
			<div className={className(modifierMap)}>
				<div className={className('text')}>
					{this.props.text}
				</div>
				{buttonElem}
			</div>
		);
	}
}
