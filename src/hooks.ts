import { Reducer, useEffect, useReducer } from "react";
import { subscribe, unSubscribe } from "./observable";
import { getStore, IStore, Store } from "./stores";
import { addProxy } from "./utils";

const store = getStore();

export const useStore = <T extends IStore>(): Store<T> => {
    const hooksHandler: ProxyHandler<Store<T>> = {
        get(target: Store<T>, property: string) {
            if (!store[property]) {
                throw new Error(`No store named ${property} is existed`);
            }
            useSubscribe(property);
            return store[property];
        },
    };
    return addProxy({}, hooksHandler) as Store<T>;
};

const useSubscribe = (name: string) => {
    const [, forceRender] = useReducer<Reducer<number, void>>(s => s + 1, 0);
    useEffect(() => {
        subscribe(name, forceRender);
        return () => unSubscribe(name, forceRender);
    }, []);
};
