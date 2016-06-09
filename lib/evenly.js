'use strict';

const unspread = require('spread-args').unspread;

const takeIterator = require('./take-iterator');

const DONE = { value: null, done: true };

/**
 * Returns an Iterator, that traverses iterators evenly.
 *
 * @param {Iterable[]} iterables - iterable objects or iterators.
 * @returns {Iterator}
 */
function evenly(iterables) {
    const iterators = iterables.map(takeIterator);
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
            return DONE;
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
