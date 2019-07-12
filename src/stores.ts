export interface IStore {
    [key: string]: any;
}

export type Store<T> = {
    [K in keyof T]: T[K];
};

export const stores: Store<IStore> = {};

export default stores;
