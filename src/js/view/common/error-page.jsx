// @flow

import React from 'react';

import Button from './button';
import Version from '../../app/version';
import ClassName from '../../misc/class-name';

type Props = {
	error: Error,
	info: any,
};

const className = ClassName('common', 'errorPage');

export default class ErrorPage extends React.Component<Props> {
	render() {
		return (
			<div className={className()}>
				<p className={className('message')}>
					Unexpected error: {this.props.error.message}
				</p>
				<div className={className('buttonLayout')}>
					<Button
						onClick={this.onReloadButtonClick_}
						title="Reload"
					/>
				</div>
			</div>
		);
	}

	onReloadButtonClick_() {
		Version.forceReload();
	}
}
