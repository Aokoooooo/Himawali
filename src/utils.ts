import { useSubscribe } from "./hooks";
import stores from "./stores";

export const defaultHandler = {
    set(target: any, property: string, value: any) {
        target[property] = addProxy(value, defaultHandler);
        return true;
    },
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

export const addProxy = (target: any, handler: ProxyHandler<any> = defaultHandler) => {
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
