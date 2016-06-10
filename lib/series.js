'use strict';

const unspread = require('spread-args').unspread;

const takeIterator = require('./take-iterator');
const done = require('./done');

/**
 * Returns an Iterator, that traverses iterators in series.
 *
 * @param {Iterable[]} iterables - iterable objects or iterators.
 * @returns {Iterator}
 */
function series(iterables) {
    let iter = takeIterator(iterables.shift());

    return {
        [Symbol.iterator]() { return this; },
        next() {
            if (!iter) {
                return done();
            }

            let next = iter.next();

            // If iterator is ended go to the next.
            // If next iterator is empty (is ended) go to the next,
            // until you get not empty iterator, or all iterators are ended.
            while (next.done) {
                iter = takeIterator(iterables.shift());

                // If iterators are ended, then exit.
                if (!iter) {
                    return done();
                }

                next = iter.next();
            }

            return next;
        }
    };
}

module.exports = unspread(series);
