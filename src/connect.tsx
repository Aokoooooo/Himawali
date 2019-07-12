import React, { ComponentType } from "react";
import { useStore } from "./hooks";
import { IStore, Store } from "./stores";

export interface IConnectProps<T extends IStore> {
    $$store: Store<T>;
}

export const connect = <T extends IStore>(mapState: (store: Store<T>) => any) => <P extends object>(
    WrappedComponent: ComponentType<P>,
) => {
    const $$store = useStore<Store<T>>();
    const result = mapState($$store);
    const hoc: React.FC<P> = props => {
        return <WrappedComponent $$store={result} {...(props as P)} />;
    };
    return hoc;
};

export default connect;
