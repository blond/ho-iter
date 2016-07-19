'use strict';

const done = require('./done');

/**
 * Returns an empty Iterator.
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
