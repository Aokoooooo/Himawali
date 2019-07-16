import { createStore } from "../src/createStore";
import { getStore } from "../src/stores";

const initTestValue = {
    test: 1,
    func() {
        console.log("old");
    },
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
        const { test } = getStore<IInitTestValue>();
        test.test = 2;
        expect(test.test).toEqual(2);
        const newFunc = () => {
            console.log("new");
        };
        test.func = newFunc;
        expect(test.func).toEqual(newFunc);
    });
    afterAll(() => {
        let store = getStore();
        store = {};
    });
});
