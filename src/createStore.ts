import { broadcast } from "./observable";
import { IStore, store } from "./stores";
import { addProxy } from "./utils";

export interface IStoreProps extends IStore {
    namespace: string;
}

const invalidProps: string[] = [];

export const createStore = (props: IStoreProps) => {
    const { namespace, ...rest } = props;
    if (Object.keys(store).includes(namespace)) {
        throw new Error(`namespace ${namespace} is already existed.`);
    }
    const newStore: IStore = rest;
    invalidProps.map(i => {
        if (typeof newStore[i] !== "undefined") {
            throw new Error(`${i} is not valid as a property name`);
        }
    });

    const defaultHandler: ProxyHandler<IStore> = {
        set(target, property: string, value) {
            if (invalidProps.includes(property) || typeof value === "function") {
                target[property] = value;
                return true;
            }
            if (target[property] !== value) {
                broadcast(namespace);
            }
            target[property] = addProxy(value, defaultHandler);
            return true;
        },
    };

    store[namespace] = addProxy(newStore, defaultHandler);
};
