import { Reducer, useEffect, useReducer } from "react";
import { subscribe, unSubscribe } from "./observable";
import { stores } from "./stores";
import { addProxy } from "./utils";

export const useStore = () => {
    const hooksHandler = {
        get(target: any, property: string) {
            if (!stores[property]) {
                throw new Error(`No store named ${property} is existed`);
            }
            useSubscribe(property);
            return stores[property];
        },
    };
    return addProxy({}, hooksHandler);
};

const useSubscribe = (name: string) => {
    const [, forceRender] = useReducer<Reducer<number, void>>(s => s + 1, 0);
    useEffect(() => {
        subscribe(name, forceRender);
        return () => unSubscribe(name, forceRender);
    }, []);
};
