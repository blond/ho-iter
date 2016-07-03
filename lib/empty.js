'use strict';

const done = require('./done');

/**
 * Returns an empty Iterator
 *
 * @returns {Iterator}
 */
function empty() {
    return {
        [Symbol.iterator]() { return this; },
        next() {
            return done();
        }
    };
}

module.exports = empty;
