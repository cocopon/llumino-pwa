// @flow

import * as Redux from 'redux';

type StoreSubscriberOptions<State, StateValue> = {
	selector: (state: State) => StateValue,
	onChange?: (value: StateValue) => void,
};

export default class StoreSubscriber<State, StateValue> {
	opts_: StoreSubscriberOptions<State, StateValue>;
	prevValue_: StateValue;

	constructor(store: Redux.Store<State, *, *>, options: StoreSubscriberOptions<State, StateValue>) {
		this.opts_ = options;

		store.subscribe(() => {
			this.onStoreSubscribe_(store.getState());
		});
	}

	onStoreSubscribe_(state: State) {
		const value = this.opts_.selector(state)

		if (this.opts_.onChange &&
				(value !== this.prevValue_)) {
			this.opts_.onChange(value);
		}

		this.prevValue_ = value;
	}
}
