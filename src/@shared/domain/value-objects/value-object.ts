import { deepFreeze } from "../utils/object";

export default abstract class ValueObject<T = any> {
    protected readonly _value: T;

    constructor(value: T) {
        this._value = deepFreeze(value);
    }
    
    get value(): T {
        return this._value;
    }

    toString = () => {
        if (this.value === undefined) {
            return this.value + "";
        }

        if (this.value === null) {
            return this.value + "";
        }

        if (typeof this.value !== 'object') {
            try {
                return this.value?.toString();
            } catch(e) {
                return this.value + "";
            }
        }

        const valueStr = this.value.toString();
        return valueStr === "[object Object]" ? JSON.stringify(this.value) : valueStr;
    };
}