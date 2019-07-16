import { createStore } from "../src/createStore";
import { getStore } from "../src/stores";

const initTestValue = {
    test: 1,
};
interface IInitTestValue {
    test: typeof initTestValue;
}

describe("createStore", () => {
    test('creatStore "test"', () => {
        const doCreate = () => createStore({ namespace: "test", ...initTestValue });
        expect(doCreate()).toEqual(undefined);
    });
    test('namespace "test" already existed', () => {
        const doCreate = () => createStore({ namespace: "test", ...initTestValue });
        expect(doCreate).toThrow("namespace test is already existed.");
    });
    test('getStore "test"', () => {
        const { test } = getStore<IInitTestValue>();
        expect(test).toEqual(initTestValue);
    });
    test("updateStore", () => {
        const setTestValueAs2 = () => {
            const store = getStore<IInitTestValue>();
            store.test.test = 2;
            return store.test.test;
        };
        expect(setTestValueAs2()).toEqual(2);
    });
    afterAll(() => {
        let store = getStore();
        store = {};
    });
});
