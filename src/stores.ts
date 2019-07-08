export interface IStore {
    [key: string]: any;
}

export interface IStores {
    [namespace: string]: IStore;
}

const stores: IStores = {};

export default stores;
