// @flow

type PersistedObject<State> = {[$Keys<State>]: any};
type InboundFunction<State> = (state: State) => PersistedObject<State>;
type OutboundFunction<State> = (obj: PersistedObject<State>) => $Shape<State>;

export default class StatePersistor<State> {
	key_: string;
	inbound: InboundFunction<State>;
	outbound: OutboundFunction<State>;

	constructor(key: string, inbound: ?InboundFunction<State>, outbound: ?OutboundFunction<State>) {
		this.key_ = key;
		this.inbound = inbound || (() => {
			return {};
		});
		this.outbound = outbound || (() => {
			return {};
		});
	}

	shouldHandle(key: string): boolean {
		return key === this.key_;
	}
}
