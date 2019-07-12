export interface IStore {
    [key: string]: any;
}

interface IStores {
    [namespace: string]: IStore;
}

export type Store<T extends IStores = {}> = {
    [K in keyof T]: T[K];
};

export const stores: Store<IStores> = {};

export default stores;
