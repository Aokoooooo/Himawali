import { Dispatch } from "react";

interface IObserverQueue {
    [name: string]: Set<Dispatch<void>>;
}

const queue: IObserverQueue = {};

export const broadcast = (name: string) => {
    if (!queue[name]) {
        return;
    }
    queue[name].forEach(fn => fn());
};

export const subscribe = (name: string, fn: Dispatch<void>) => {
    if (!queue[name]) {
        queue[name] = new Set<Dispatch<void>>();
    }
    queue[name].add(fn);
};

export const unSubscribe = (name: string, fn: Dispatch<void>) => {
    if (!queue[name]) {
        return;
    }
    if (queue[name].has(fn)) {
        queue[name].delete(fn);
    }
};
