import { Reducer, useEffect, useReducer } from "react";
import { subscribe, unSubscribe } from "./observable";
import { stores } from "./stores";

export const addProxy = (target: any, handler: ProxyHandler<any>) => {
    if (typeof target !== "object" || target === null) {
        return target;
    }
    if (Array.isArray(target)) {
        target.forEach((item, index) => {
            target[index] = addProxy(item, handler);
        });
    } else if (typeof target === "object") {
        Object.keys(target).forEach(key => {
            if (typeof target[key] === "object") {
                target[key] = addProxy(target[key], handler);
            }
        });
    }
    return new Proxy(target, handler);
};

export const useSubscribe = (name: string) => {
    const [, forceRender] = useReducer<Reducer<number, void>>(s => s + 1, 0);
    useEffect(() => {
        subscribe(name, forceRender);
        return () => unSubscribe(name, forceRender);
    }, []);
};

export const hooksHandler = {
    get(target: any, property: string) {
        if (!stores[property]) {
            throw new Error(`No store named ${property} is existed`);
        }
        useSubscribe(property);
        return stores[property];
    },
};
