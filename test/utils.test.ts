import { IStore } from "../src/stores";
import { addProxy } from "../src/utils";

const initTestValue = {
    undefined,
    null: null,
    boolean: false,
    number: 1,
    string: "str",
    func() {
        console.log("this is a function");
    },
    array: [
        undefined,
        null,
        true,
        1,
        "string",
        () => {
            console.log("func");
        },
    ],
};

const handler: ProxyHandler<IStore> = {
    get(target, property: string) {
        switch (typeof target[property]) {
            case "boolean":
                return `boolean: ${target[property]}`;
            case "function":
                return `function`;
            case "number":
                return `number: ${target[property]}`;
            case "object": {
                return target[property];
            }
            case "string":
                return target[property];
            case "undefined":
                return undefined;
        }
    },
};

describe("utils", () => {
    describe("addProxy", () => {
        test("addProxy", () => {
            const doAddProxy = () => {
                addProxy(initTestValue, handler);
            };
            expect(doAddProxy()).toEqual(undefined);
        });
        test("get undefined", () => {
            const proxy = addProxy<typeof initTestValue>(initTestValue, handler);
            expect(proxy.undefined).toBeUndefined();
        });
        test("get null", () => {
            const proxy = addProxy<typeof initTestValue>(initTestValue, handler);
            expect(proxy.null).toBeNull();
        });
        test("get boolean", () => {
            const proxy = addProxy<typeof initTestValue>(initTestValue, handler);
            expect(proxy.boolean).toEqual("boolean: false");
        });
        test("get number", () => {
            const proxy = addProxy<typeof initTestValue>(initTestValue, handler);
            expect(proxy.number).toEqual("number: 1");
        });
        test("get string", () => {
            const proxy = addProxy<typeof initTestValue>(initTestValue, handler);
            expect(proxy.string).toEqual("str");
        });
        test("get function", () => {
            const proxy = addProxy<typeof initTestValue>(initTestValue, handler);
            expect(proxy.func).toEqual("function");
        });
        test("get array", () => {
            const { array } = addProxy<typeof initTestValue>(initTestValue, handler);
            expect(array[0]).toBeUndefined();
            expect(array[1]).toBeNull();
            expect(array[2]).toEqual("boolean: true");
            expect(array[3]).toEqual("number: 1");
            expect(array[4]).toEqual("string");
            expect(array[5]).toEqual("function");
        });
    });
});
