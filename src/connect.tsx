import React, { ComponentType } from "react";
import { useStore } from "./hooks";
import { IStore, Store } from "./stores";

interface IConnectProps<T extends IStore> {
    $$store: Store<T>;
}

export const connect = <T extends IStore>(WrappedComponent: ComponentType) => {
    const $$store = useStore();
    return class extends React.Component<IConnectProps<T>> {
        public render() {
            return <WrappedComponent $$store={$$store} {...this.props} />;
        }
    };
};

export default connect;
