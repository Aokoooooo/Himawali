import { broadcast } from "./observable";
import stores, { IStore } from "./stores";
import { addProxy } from "./utils";

export interface IStoreProps extends IStore {
    namespace: string;
}

const invalidProps = ["stores"];

export const createStore = (props: IStoreProps) => {
    const { namespace, ...rest } = props;
    if (Object.keys(stores).includes(namespace)) {
        throw new Error(`namespace ${namespace} is already existed.`);
    }
    const store: IStore = {};

    const defaultHandler = {
        set(target: any, property: string, value: any) {
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
    Object.keys(rest || {}).map(key => {
        if (typeof rest[key] !== "undefined" && invalidProps.includes(key)) {
            throw new Error(`${key} is not valid name as a param`);
        }
        store[key] = addProxy(rest[key], defaultHandler);
    });

    Object.assign(store, {
        stores,
    });

    stores[namespace] = store;
};
