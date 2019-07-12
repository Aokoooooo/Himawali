if (typeof Proxy === "undefined") {
    throw new Error("himawari-store requires Proxy object which your environment doesn't support");
}

import { createStore, IStoreProps } from "./createStore";
import { useStore } from "./hooks";
import store, { IStore, Store } from "./stores";

export { store, useStore, createStore, IStore, IStoreProps, Store };
