import ValueObject from "./value-object";

class StubValueObject extends ValueObject {

}

describe('ValueObject Unit Tests', () => {
    it('should set value',() => {
        let vo: StubValueObject = new StubValueObject('string value');
        expect(vo.value).toBe('string value');

        vo = new StubValueObject({ prop1: 'value1' });
        expect(vo.value).toStrictEqual({ prop1: 'value1' });
    });

    it('should convert to string', () => {
        const date = new Date();
        const obj1 = {total: 123.45};
        const obj2 = {name: "Foo Bar"};
        const arrange = [
            { input: null, expected: "null" },
            { input: undefined, expected: "undefined" },
            { input: "sample text", expected: "sample text" },
            { input: true, expected: "true" },
            { input: false, expected: "false" },
            { input: 123, expected: "123" },
            { input: -432.10, expected: "-432.1" },
            { input: obj1, expected: JSON.stringify(obj1) },
            { input: obj2, expected: JSON.stringify(obj2) },
            { input: date, expected: date.toString() },
        ];

        arrange.forEach((item) => {
            expect(`${new StubValueObject(item.input)}`).toBe(item.expected);
        })
    });

    it('should avoid changing property value', () => {
        let obj = new StubValueObject({ level1: 'level 1', nested: { level2: 'leve 2'}});
        expect(() => { obj['_value'].level1 = 'new level 1'; } ).toThrow();
        expect(() => { obj['_value'].nested = 'nested value'; } ).toThrow();
        expect(() => { obj['_value'].nested.level2 = 'new level 2'; } ).toThrow();
    });

    it('should be a immutable object', () => {
        const obj = { prop1: 'value1', deep: {  prop2: 'value2', prop3: new Date() } };
        const valueObject = new StubValueObject(obj);
        expect(() => { (valueObject as any).value.prop1 = 'new value'; }).toThrow();
        expect(() => { (valueObject as any).value.deep.prop2 = 'new value'; }).toThrow();
        expect(valueObject.value.deep.prop3).toBeInstanceOf(Date);
    });
});