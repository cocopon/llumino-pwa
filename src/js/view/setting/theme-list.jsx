// @flow

import * as React from 'react';

import ClassName from '../../misc/class-name';
import Theme from '../../model/theme';

const className = ClassName('setting', 'themeList');
const itemClassName = ClassName('setting', 'themeListItem');

type Props = {
	onItemClick: (theme: Theme) => void,
	themes: Theme[],
};

const EMPTY_HANDLER = () => {};

export default class ThemeList extends React.Component<Props> {
	constructor(props: Props) {
		super(props);

		(this: any).onItemClick_ = this.onItemClick_.bind(this);
	}

	render() {
		const itemElems = this.props.themes.map((theme) => {
			return (
				<div
					className={itemClassName()}
					key={theme.id}
				>
					<button
						className={itemClassName('button')}
						data-id={theme.id}
						onClick={this.onItemClick_}
					>
						<div
							className={itemClassName('preview')}
							style={{
								backgroundColor: theme.backgroundColor,
							}}
						>
						</div>
						<div className={itemClassName('title')}>
							{theme.name}
						</div>
					</button>
				</div>
			);
		});

		return (
			<div className={className()}>
				{itemElems}
			</div>
		);
	}

	onItemClick_(e: SyntheticMouseEvent<HTMLButtonElement>) {
		const elem = e.currentTarget;
		const themeId = elem.dataset.id;
		const theme = this.props.themes.filter((theme) => {
			return theme.id === themeId;
		})[0];

		this.props.onItemClick(theme);
	}
}
