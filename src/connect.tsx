import React, { ComponentType } from "react";
import { useStore } from "./hooks";
import { Store } from "./stores";

interface IConnectProps {
    $$store: Store;
}

export const connect = (WrappedComponent: ComponentType) => {
    const $$store = useStore();
    return class extends React.Component<IConnectProps> {
        public render() {
            return <WrappedComponent $$store={$$store} {...this.props} />;
        }
    };
};

export default connect;
