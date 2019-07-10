import { addProxy, hooksHandler } from "./utils";

export interface IStore {
    [key: string]: any;
}

export interface IStores {
    [namespace: string]: IStore;
}

export const stores: IStores = {};

const store = addProxy({}, hooksHandler);
export default store;
