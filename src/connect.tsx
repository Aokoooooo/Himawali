import React, { ComponentType } from "react";
import { useStore } from "./hooks";
import { IStores, Store } from "./stores";

interface IConnectProps<T extends IStores> {
    $$store: Store<T>;
}

export const connect = <T extends IStores>(WrappedComponent: ComponentType) => {
    const $$store = useStore();
    return class extends React.Component<IConnectProps<T>> {
        public render() {
            return <WrappedComponent $$store={$$store} {...this.props} />;
        }
    };
};

export default connect;
