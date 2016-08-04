'use strict';

const done = require('./done');

/**
 * Returns an empty Iterator.
 *
 * @example
 * const empty = require('ho-iter').empty;
 *
 * const iter = empty();
 *
 * iter.next(); // { value: null, done: true }
 *
 * @returns {Iterator}
 */
module.exports = () => {
    return {
        [Symbol.iterator]() { return this; },
        next() {
            return done();
        }
    };
};
