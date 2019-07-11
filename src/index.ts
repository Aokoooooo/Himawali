if (typeof Proxy === "undefined") {
    throw new Error("himawari-store requires Proxy object which your environment doesn't support");
}

import { createStore, IStoreProps } from "./createStore";
import { useStore } from "./hooks";
import stores, { IStore, IStores } from "./stores";

export { stores, useStore, createStore, IStore, IStores, IStoreProps };
