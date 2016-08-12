'use strict';

const unspread = require('spread-args').unspread;

const createIterator = require('./create-iterator');
const done = require('./done');

/**
 * Returns an Iterator, that traverses iterators evenly.
 *
 * This is reminiscent of the traversing of several arrays
 *
 * @example
 * const evenly = require('ho-iter').evenly;
 *
 * const arr1 = [1, 2];
 * const arr2 = [3, 4];
 *
 * const set1 = new Set([1, 2]);
 * const set2 = new Set([3, 4]);
 *
 * for (let i = 0; i < arr1.length; i++) {
 *     console.log(arr1[i]);
 *     console.log(arr2[i]);
 * }
 *
 * // 1 3 2 4
 *
 * for (let item of evenly(set1, set2)) {
 *     console.log(item);
 * }
 *
 * // 1 3 2 4
 *
 * @param {Iterable[]} iterables - iterable objects or iterators.
 * @returns {Iterator}
 */
function evenly(iterables) {
    const iterators = iterables.map(iterable => createIterator(iterable, { strict: false }));
    const empties = new Set();

    const count = iterators.length;
    let index = -1;

    /**
     * Returns next iterator.
     *
     * Returns the first iterator after the last one.
     *
     * @returns {Iterator}
     */
    function step() {
        // Back to the first iterator.
        if (index === count - 1) {
            index = -1;
        }

        // Go to the next iterator.
        index++;

        // Ignore empty iterators.
        while(empties.has(index)) {
            if (index === count - 1) {
                index = -1;
            }

            index++;
        }

        return iterators[index];
    }

    /**
     * Returns next value.
     *
     * @returns {{done: boolean, value: *}}
     */
    function next() {
        // Exit if all iterators are traversed.
        if (empties.size === count) {
            return done;
        }

        // Go to the next iterator.
        const iter = step();

        const res = iter.next();

        // Mark iterator as empty and go to the next.
        if (res.done) {
            empties.add(index);

            return next();
        }

        return res;
    }

    return { next, [Symbol.iterator]() { return this; } };
}

module.exports = unspread(evenly);
