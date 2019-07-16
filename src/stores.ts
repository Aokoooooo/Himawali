export interface IStore {
    [key: string]: any;
}

export type Store<T> = {
    [K in keyof T]: T[K];
};

const store: Store<any> = {};

export const getStore = <T extends IStore>(): Store<T> => {
    return store;
};
