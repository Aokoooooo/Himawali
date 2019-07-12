import { IStore } from "./stores";

export const addProxy = <T extends IStore>(target: T, handler: ProxyHandler<T>) => {
    if (typeof target !== "object" || target === null) {
        return target;
    }
    if (Array.isArray(target)) {
        target.forEach((item: T[keyof T], index: number) => {
            target[index] = addProxy(item, handler);
        });
    } else if (typeof target === "object") {
        Object.keys(target).forEach((key: keyof T) => {
            target[key] = addProxy(target[key], handler);
        });
    }
    return new Proxy(target, handler);
};
