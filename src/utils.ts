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
