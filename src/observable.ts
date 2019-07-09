import { Dispatch } from "react";

interface IObserverQueue {
    [name: string]: Array<Dispatch<void>>;
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
        queue[name] = [];
    }
    queue[name].push(fn);
};

export const unSubscribe = (name: string, fn: Dispatch<void>) => {
    if (!queue[name]) {
        return;
    }
    const index = queue[name].indexOf(fn);
    if (index !== -1) {
        queue[name].splice(index, 1);
    }
};
