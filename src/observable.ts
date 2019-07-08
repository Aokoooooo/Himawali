import { IStore } from "./stores";

interface IObserverQueue {
    [name: string]: IStore;
}
const queue: IObserverQueue = {};

export const broadcast = (name: string, state: IStore) => {
    if (!queue[name]) {
        return;
    }
    queue[name].forEach((fn: (state: IStore) => void) => fn(state));
};

export const subscribe = (name: string, fn: (state: IStore) => void) => {
    if (!queue[name]) {
        queue[name] = [];
    }
    queue[name].push(fn);
};

export const unSubscribe = (name: string, fn: (state: IStore) => void) => {
    if (!queue[name]) {
        return;
    }
    const index = queue[name].indexOf(fn);
    if (index !== -1) {
        queue[name].splice(index, 1);
    }
};
