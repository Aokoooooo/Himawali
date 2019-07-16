import { broadcast } from "./observable";
import { getStore, IStore } from "./stores";
import { addProxy } from "./utils";

const store = getStore();
export interface IStoreProps extends IStore {
    namespace: string;
}

export const createStore = (props: IStoreProps) => {
    const { namespace, ...rest } = props;
    if (Object.keys(store).includes(namespace)) {
        throw new Error(`namespace ${namespace} is already existed.`);
    }
    const newStore: IStore = rest;

    const defaultHandler: ProxyHandler<IStore> = {
        set(target, property: string, value) {
            if (typeof value === "function") {
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
