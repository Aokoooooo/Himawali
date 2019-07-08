import { useEffect, useState } from "react";
import { subscribe, unSubscribe } from "./observable";
import { addProxy, hooksHandler } from "./utils";

export const useStore = () => {
    return addProxy({}, hooksHandler);
};

export const useSubscribe = (name: string) => {
    const [store, setStore] = useState();
    useEffect(() => {
        subscribe(name, setStore);
        return () => unSubscribe(name, setStore);
    }, []);
};
