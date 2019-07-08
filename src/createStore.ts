import { broadcast } from "./observable";
import stores, { IStore } from "./stores";
import { addProxy } from "./utils";

export interface IStoreProps extends IStore {
    namespace: string;
}

export const createStore = (props: IStoreProps) => {
    const { namespace, ...rest } = props;
    if (Object.keys(stores).includes(namespace)) {
        throw new Error(`namespace ${namespace} is already existed.`);
    }
    const store: IStore = {};

    const defaultHandler = {
        set(target: any, property: string, value: any) {
            if (target[property] !== value) {
                broadcast(namespace)
            }
            target[property] = addProxy(value, defaultHandler);
            return true;
        },
    };
    Object.keys(rest || {}).map(key => {
        store[key] = addProxy(rest[key], defaultHandler);
    });
    
    stores[namespace] = store;
};
