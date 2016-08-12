'use strict';

const unspread = require('spread-args').unspread;

const createIterator = require('./create-iterator');
const done = require('./done');

/**
 * Returns an Iterator, that traverses iterators in series.
 *
 * This is reminiscent of the concatenation of arrays.
 *
 * @example
 * ```js
 * const series = require('ho-iter').series;
 *
 * const arr1 = [1, 2];
 * const arr2 = [3, 4];
 *
 * const set1 = new Set([1, 2]);
 * const set2 = new Set([3, 4]);
 *
 * [].concat(arr1, arr2); // [1, 2, 3, 4]
 *
 * for (let item of series(set1, set2)) {
 *     console.log(item);
 * }
 *
 * // 1 2 3 4
 * ```
 *
 * @param {Iterable[]} iterables - iterable objects or iterators.
 * @returns {Iterator}
 */
function series(iterables) {
    if (iterables.length === 0) {
        return createIterator();
    }

    let iter = createIterator(iterables.shift(), { strict: false });

    return {
        [Symbol.iterator]() { return this; },
        next() {
            let next = iter.next();

            // If iterator is ended go to the next.
            // If next iterator is empty (is ended) go to the next,
            // until you get not empty iterator, or all iterators are ended.
            while (next.done) {
                // If iterators are ended, then exit.
                if (iterables.length === 0) {
                    return done;
                }

                iter = createIterator(iterables.shift(), { strict: false });

                next = iter.next();
            }

            return next;
        }
    };
}

module.exports = unspread(series);
