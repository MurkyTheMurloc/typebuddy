import {isPlainObject} from "../src";

describe('isPlainObject', () => {
    it('should return true for plain object inputs', () => {
        expect(isPlainObject({})).toBe(true);

    });

    it('should return false for non-plain object inputs', () => {
        expect(isPlainObject(new Date())).toBe(false);
        expect(isPlainObject(/abc/)).toBe(false);
        expect(isPlainObject(new RegExp('abc'))).toBe(false);
        expect(isPlainObject(new Error())).toBe(false);
        expect(isPlainObject('Hello')).toBe(false);
        expect(isPlainObject(123)).toBe(false);
        expect(isPlainObject([])).toBe(false);
        expect(isPlainObject(null)).toBe(false);
        expect(isPlainObject(undefined)).toBe(false);
        expect(isPlainObject(Symbol())).toBe(false);
        expect(isPlainObject(NaN)).toBe(false);
        expect(isPlainObject({a: 1, b: 2})).toBe(false);
        expect(isPlainObject({a: null, b: 2})).toBe(false);
        expect(isPlainObject({a: undefined, b: 2})).toBe(false);
    });
});