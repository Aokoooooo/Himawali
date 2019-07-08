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
    Object.keys(rest || {}).map(key => {
        store[key] = addProxy(rest[key]);
    });
    stores[namespace] = store;
};
