const uuidRegex =
    /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/;

const ulidRegex = /^[0123456789ABCDEFGHJKMNPQRSTVWXYZ]{26}$/;

/**
 * Returns true if the value is an object.
 * @param {unknown} value - The value to check.
 * @returns {boolean} True if the value is an object.
 */
export function isObject(value: unknown): value is object {
    return (
        typeof value === "object" &&
        !isNull(value) &&
        !isUndefined(value) &&
        !Array.isArray(value)
    );
}

/**
 * Returns true if the value is a boolean.
 * @param {unknown} value - The value to check.
 * @returns {boolean} True if the value is a boolean.
 */
export function isBoolean(value: unknown): value is boolean {
    return typeof value === "boolean";
}

/**
 * Returns true if the value is null.
 * @param {unknown} value - The value to check.
 * @returns {boolean} True if the value is null.
 */
export function isNull(value: unknown): value is null {
    return value === null;
}

/**
 * Returns true if the value is undefined.
 * @param {unknown} value - The value to check.
 * @returns {boolean} True if the value is undefined.
 */
export function isUndefined(value: unknown): value is undefined {
    return value === undefined;
}

/**
 * Returns true if the value is a function.
 * @param {unknown} value - The value to check.
 * @returns {boolean} True if the value is a function.
 */
export function isFunction(value: unknown): value is Function {
    return typeof value === "function";
}

/**
 * Returns true if the value is a promise.
 * @param {unknown} value - The value to check.
 * @returns {boolean} True if the value is a promise.
 */
export function isPromise(value: unknown): value is Promise<unknown> {
    return (
        typeof value === "object" &&
        value !== null &&
        typeof (value as Promise<unknown>).then === "function"
    );
}

/**
 * Returns true if the value is an error.
 * @param {unknown} value - The value to check.
 * @returns {boolean} True if the value is an error.
 */
export function isError(value: unknown): value is Error {
    return value instanceof Error;
}

/**
 * Returns true if the value is a date.
 * @param {unknown} value - The value to check.
 * @returns {boolean} True if the value is a date.
 */
export function isDate(value: unknown): value is Date {
    return value instanceof Date;
}

/**
 * Returns true if the value is a RegExp.
 * @param {unknown} value - The value to check.
 * @returns {boolean} True if the value is a RegExp.
 */
export function isRegExp(value: unknown): value is RegExp {
    return value instanceof RegExp;
}

/**
 * Returns true if the value is a symbol.
 * @param {unknown} value - The value to check.
 * @returns {boolean} True if the value is a symbol.
 */
export function isSymbol(value: unknown): value is symbol {
    return typeof value === "symbol";
}

/**
 * Check if a value is a plain object.
 * @param {unknown} value - The value to check.
 * @returns {boolean} True if the value is a plain object.
 */
export function isPlainObject<T extends Record<string, unknown>>(
    value: unknown
): value is T {
    return typeof value === "object" && value !== null && !Array.isArray(value);
}

/**
 * Check if a value is an instance of a class.
 * @param {unknown} value - The value to check.
 * @param {unknown} constructor - The class constructor to check against.
 * @returns {boolean} True if the value is an instance of the class.
 */
export function isInstanceOf<T>(
    value: unknown,
    constructor: { new (): T }
): value is T {
    return value instanceof constructor;
}

/**
 * Get the type of value.
 * @param {unknown} value - The value to check.
 * @returns  type of value.
 */
export function getType<T>(value: T): T {
    return value;
}

/**
 * Get the keys of an object.
 * @param {unknown} object - The object to get the keys of.
 * @returns {Array} Keys of object.
 */
export function getKeys<T extends Record<string, unknown>>(
    object: T
): Array<keyof T> {
    return Object.keys(object) as Array<keyof T>;
}

/**
 * Check if a value is an array.
 * @param {unknown} value - The value to check.
 * @returns {boolean} True if the value is an array.
 */
export function isArray<T>(value: unknown): value is T[] {
    return Array.isArray(value);
}

/**
 * Check if a value is a number.
 * @param {unknown} value - The value to check.
 * @returns {boolean} True if the value is a number.
 */
export function isNumber(value: unknown): value is number {
    if (typeof value === "string" && value.trim() === "") {
        return false;
    }
    return (
        typeof value === "number" &&
        !Number.isNaN(value) &&
        Number.isFinite(+value)
    );
}

/**
 * Check if a value is an integer.
 * @param {unknown} value - The value to check.
 * @returns {boolean} True if the value is an integer.
 */
export function isInteger(value: unknown): value is number {
    return Number.isInteger(value) && !isNaN(parseInteger(value));
}

/**
 * Check if a value is a float.
 * @param {unknown} value - The value to check.
 * @returns {boolean} True if the value is a float.
 */
export function isFloat(value: unknown): value is number {
    return (
        typeof value === "number" &&
        !Number.isNaN(value) &&
        !Number.isInteger(value)
    );
}

/**
 * Check if a value is a string.
 * @param {unknown} value - The value to check.
 * @returns {boolean} True if the value is a string.
 */
export function isString(value: unknown): value is string {
    return typeof value === "string";
}

/**
 * Parses the input value as a number. Returns NaN if the value cannot be
 * parsed.
 * @param {unknown} value - The value to check.
 * @returns {number} The parsed number.
 */
export function parseNumber(value: unknown): number {
    if (isNumber(value)) {
        return value;
    } else if (isString(value)) {
        const parsed = parseFloat(value);
        return isNaN(parsed) ? NaN : parsed;
    } else {
        return 0;
    }
}

/**
 * Parses the input value as an integer. Returns NaN if the value cannot
 * be parsed.
 * @param {unknown} value - The value to check.
 * @returns {number} The parsed integer.
 */
export function parseInteger(value: unknown): number {
    if (isNumber(value)) {
        return Math.floor(value);
    } else if (isString(value)) {
        const parsed = parseInt(value, 10);
        return (isNaN(parsed) ? NaN : parsed) satisfies number;
    } else {
        return NaN;
    }
}

/**
 * Parses the input value as a float. Returns NaN if the value
 * cannot be parsed.
 * @param {unknown} value - The value to check.
 * @returns {number} The parsed float.
 */
export function parseFloat(value: unknown): number {
    if (isNumber(value)) {
        return value;
    } else if (isString(value)) {
        const parsed = parseFloat(value);
        return isNaN(parsed) ? NaN : parsed;
    } else {
        return NaN;
    }
}

/**
 * Parses the input value as a string. Returns an empty string if the
 * value cannot be converted.
 * @param {unknown} value - The value to check.
 * @returns {string} The parsed string.
 */
export function parseString(value: unknown): string {
    if (isString(value)) {
        return value;
    } else if (isNumber(value)) {
        return value.toString();
    } else if (typeof value === "boolean") {
        return value.toString();
    } else {
        return "";
    }
}

/**
 * Parses the input value as a boolean. Returns false if the value is no string.
 * @param {unknown} value - The value to check.
 * @returns {boolean} True if the value is a string.
 */

/**
 *
 * @param value
 */
export function isEmptyString(value: unknown): boolean {
    if (!isString(value)) return false;
    return value.trim() === "";
}

/**
 * Returns true if the value is an empty string, an empty object, or an empty number.
 * @param {unknown} value - The value to check.
 * @returns {boolean} True if the value is an empty string, an empty object, or an empty number.
 */
export function isNullOrUndefined(value: unknown): boolean {
    if (isString(value)) {
        return isEmptyString(value);
    } else if (isPlainObject(value)) {
        for (const key in value) {
            if (!isNullOrUndefined(value[key])) {
                return false;
            }
        }
        return true;
    } else if (isArray(value)) {
        return value.length === 0;
    } else if (isNumber(value)) {
        return isNaN(value) && value === 0;
    } else if (isBoolean(value)) {
        return !value;
    } else if (isNull(value) || isUndefined(value)) {
        return true;
    }
    return false;
}

/**
 * Returns true if an object contains an empty value.
 * @param value
 */
export function hasEmptyValues(value: unknown): boolean {
    if (isString(value)) {
        if (isPlainObject(JSON.parse(value))) return true;
        return isEmptyString(value);
    }
    return !!isPlainObject(value);
}

/**
 * Parses the input value as an array. Returns an empty array if the value
 * cannot be parsed as an array.
 * @param {unknown} value - The value to check.
 * @returns {T[]} The parsed array.
 */
export function parseArray<T>(value: unknown): T[] {
    if (Array.isArray(value)) {
        return value as T[];
    }
    if (isString(value)) {
        return value.split(/[,|;\n\t ]+/) as T[];
    }
    if (isNumber(value)) {
        return [value] as T[];
    }
    if (isPlainObject(value)) {
        return [value] as T[];
    }

    if (isNullOrUndefined(value)) {
        return [];
    }
    return [];
}

/**
 *  Compares two arrays and returns true if they have at least one common value.
 * @param array1
 * @param array2
 * @returns {boolean} True if the arrays have at least one common value.
 */
export function arrayContainsCommonValue(
    array1: string[],
    array2: string[]
): boolean {
    if (!array1 || !array2) return false;
    if (!array1.length || !array2.length) return false;

    const valueOccurrences: Record<string, boolean> = {};
    array1.forEach((value) => {
        valueOccurrences[value] = true;
    });

    return array2.some((value) => valueOccurrences[value]);
}

/**
 * Returns true if the input is a UUID string.
 * @param {string} input - The input to check.
 * @returns {boolean} True if the input is a UUID string.
 */
export function isUuidString(input: unknown): input is string {
    return isString(input) && uuidRegex.test(input);
}

/**
 * Returns true if the input is a ULID string.
 * @param {string }input - The input to check.
 * @returns {boolean} True if the input is a ULID string.
 */
export function isUlidString(input: unknown): input is string {
    return typeof input === "string" && ulidRegex.test(input);
}

/**
 * Parses the domain name from a URL.
 * @param {string} url - The URL to parse.
 * @returns {string} The domain name.
 */
export function parseDomainName(url: string): string {
    const match = url.match(/^(?:https?:\/\/)?(?:www\d?\.)?([^/]+)/i);
    if (!match) {
        throw new Error("Invalid URL");
    }

    const domainParts = match[1].split(".");
    if (domainParts.length > 1) {
        return domainParts[0];
    }

    return match[1];
}
