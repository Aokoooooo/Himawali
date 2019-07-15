import React, { ComponentType } from "react";
import { useStore } from "./hooks";
import { IStore, Store } from "./stores";

export interface IConnectProps<T extends any> {
    $$store: T;
}

export const connect = <T extends IStore>(mapState: (store: Store<T>) => any) => <P extends object>(
    WrappedComponent: ComponentType<P>,
) => {
    const hoc: React.FC<P> = props => {
        const $$store = useStore<Store<T>>();
        const result = mapState($$store);
        return <WrappedComponent $$store={result} {...(props as P)} />;
    };
    return hoc;
};
