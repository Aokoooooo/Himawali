export interface IStoreState {
    [key: string]: any;
}

export interface IStores {
    [namespace: string]: IStoreState;
}

export type Store<T extends IStores> = {
    [K in keyof T]: T[K];
};

export const stores: Store<IStores> = {};

export default stores;
