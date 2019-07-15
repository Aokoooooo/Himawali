import { broadcast } from "./observable";
import { IStore, stores } from "./stores";
import { addProxy } from "./utils";

export interface IStoreProps extends IStore {
    namespace: string;
}

const invalidProps: string[] = [];

export const createStore = (props: IStoreProps) => {
    const { namespace, ...rest } = props;
    if (Object.keys(stores).includes(namespace)) {
        throw new Error(`namespace ${namespace} is already existed.`);
    }
    const store: IStore = rest;
    invalidProps.map(i => {
        if (typeof store[i] !== "undefined") {
            throw new Error(`${i} is not valid name as a param`);
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

    stores[namespace] = addProxy(store, defaultHandler);
};
