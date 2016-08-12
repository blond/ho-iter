'use strict';

const done = require('./done');

/**
 * Iterator with specified value.
 *
 * @example
 * const iter = new ValueIterator(123);
 *
 * iter.next(); // { value: 123, done: false }
 * iter.next(); // { value: null, done: true }
 *
 * @param {*} value — the value which will be in created iterator.
 * @returns {Iterator}
 */
module.exports = class ValueIterator {
    constructor(value) {
        this._value = value;
        this._done = Boolean(arguments.length === 0);
    }
    [Symbol.iterator]() {
        return this;
    }
    next() {
        if (this._done) {
            return done;
        }

        this._done = true;

        return { value: this._value, done: false };
    }
};
