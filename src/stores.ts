export interface IStore {
    [key: string]: any;
}

export interface IStores {
    [namespace: string]: IStore;
}

export const stores: IStores = {};

export default stores;
