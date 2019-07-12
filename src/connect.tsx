import React, { ComponentProps, ComponentType } from "react";
import { useStore } from "./hooks";

export const connect = (WrappedComponent: ComponentType) => (props: ComponentProps<any>) => {
    const $$store = useStore();
    return (
        <WrappedComponent $$store={$$store} {...props} />
    )
};

export default connect
