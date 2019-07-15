if (typeof Proxy === "undefined") {
    throw new Error("himawari-store requires Proxy object which your environment doesn't support");
}

import { connect, IConnectProps } from "./connect";
import { createStore, IStoreProps } from "./createStore";
import { useStore } from "./hooks";
import { getStore, IStore, Store } from "./stores";

export { getStore, useStore, createStore, IStore, IStoreProps, IConnectProps, Store, connect };
