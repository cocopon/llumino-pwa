// @flow

import Color from 'color';
import * as React from 'react';

import ClassName from '../../misc/class-name';
import Theme from '../../model/theme';

const className = ClassName('setting', 'themeList');
const itemClassName = ClassName('setting', 'themeListItem');

type Props = {
	onItemClick: (theme: Theme) => void,
	themes: Theme[],
};

const ENERGY_COUNT = 5;

export default class ThemeList extends React.Component<Props> {
	constructor(props: Props) {
		super(props);

		(this: any).onItemClick_ = this.onItemClick_.bind(this);
	}

	render() {
		const itemElems = this.props.themes.map((theme) => {
			const energyElems = [];
			for (let index = 0; index < ENERGY_COUNT; index++) {
				const e1 = Color(theme.energyColors[0]);
				const e2 = Color(theme.energyColors[1]);
				energyElems.push(
					<div
						className={itemClassName('energy')}
						key={index}
						style={{
							backgroundColor: e1.mix(e2, index / (ENERGY_COUNT - 1)).string(),
						}}
					/>
				);
			};

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
						<div className={itemClassName('previewLayout')}>
							<div
								className={itemClassName('preview')}
								style={{
									backgroundColor: theme.backgroundColor,
								}}
							>
								<div className={itemClassName('previewContentLayout')}>
									<div
										className={itemClassName('previewText')}
										style={{
											color: theme.foregroundColor,
										}}
									>
										{theme.name}
									</div>
									<div className={itemClassName('energiesLayout')}>
										{energyElems}
									</div>
								</div>
							</div>
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
