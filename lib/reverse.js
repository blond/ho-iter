'use strict';

const assert = require('assert');

const createIterator = require('./create-iterator');
const done = require('./done');

/**
 * Returns an reversed Iterator.
 *
 * **Important:** incompatible with infinite iterator.
 * Don't use infinite iterator, otherwise reverse method will fall into endless loop loop.
 *
 * This is reminiscent of the reversing of an array.
 *
 * @example
 * const reverse = require('ho-iter').reverse;
 *
 * const arr = [1, 2, 3, 4];
 * const set = new Set([1, 2, 3, 4]);
 *
 * for (let i = arr.length - 1 ; i >= 0; i--) {
 *     console.log(arr[i]);
 * }
 *
 * // ➜ 4 3 2 1
 *
 * for (let item of reverse(set)) {
 *     console.log(item);
 * }
 *
 * // ➜ 4 3 2 1
 *
 * @param {Iterable} iterable iterable object to reversing.
 * @returns {Iterator}
 */
function reverse(iterable) {
    assert(
        arguments.length < 2,
        'The `resolve()` method not support more than one argument. Use `series() or `evenly()` to combine iterators.'
    );

    if (arguments.length === 0) {
        return createIterator();
    }

    const iter = createIterator(iterable);
    const arr = Array.from(iter);

    let index = arr.length - 1;

    return {
        [Symbol.iterator]() { return this; },
        next() {
            if (index === -1) {
                return done;
            }

            return {
                value: arr[index--],
                done: false
            }
        }
    }
}

module.exports = reverse;
