'use strict';

const done = require('./done');

/**
 * Creates an iterator whose elements are arrays corresponding to the enumerable property [key, value] pairs
 * found directly upon object.
 *
 * The ordering of the properties is the same as that given by looping over the property values of the object manually.
 *
 * @example <caption>Iterate by Object entries</caption>
 * const obj = { foo: 'bar', baz: 42 }
 * const entries = new ObjectEntriesIterator(obj);
 *
 * for (let [key, value] of entries) {
 *     console.log(`${key}: ${value}`);
 * }
 *
 * // foo: 'bar'
 * // baz: 42
 *
 * @example <caption>Converting an Object to a Map</caption>
 * const obj = { foo: 'bar', baz: 42 }
 * const entries = new ObjectEntriesIterator(obj);
 * const map = new Map(entries);
 *
 * // Map { foo: "bar", baz: 42 }
 *
 * @param {object} obj — The object whose enumerable own property [key, value] pairs are to be returned.
 * @returns {Iterator}
 */
module.exports = class ObjectEntriesIterator {
    constructor(obj) {
        this._obj = obj;
        this._keys = Object.keys(obj);

        this._length = this._keys.length;
        this._index = 0;
    }
    [Symbol.iterator]() {
        return this;
    }
    next() {
        if (this._index === this._length) {
            return done;
        }

        const key = this._keys[this._index++];
        const val = this._obj[key];

        return { value: [key, val], done: false };
    }
};
