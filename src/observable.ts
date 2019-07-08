interface IObserverQueue {
    [name: string]: Array<(key: number) => void>;
}
const queue: IObserverQueue = {};
let key = 0;

export const broadcast = (name: string) => {
    if (!queue[name]) {
        return;
    }
    queue[name].forEach((fn) => fn(key++));
};

export const subscribe = (name: string, fn: (key: number) => void) => {
    if (!queue[name]) {
        queue[name] = [];
    }
    queue[name].push(fn);
};

export const unSubscribe = (name: string, fn: (key: number) => void) => {
    if (!queue[name]) {
        return;
    }
    const index = queue[name].indexOf(fn);
    if (index !== -1) {
        queue[name].splice(index, 1);
    }
};
