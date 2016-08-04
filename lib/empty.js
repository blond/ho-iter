'use strict';

const ValueIterator = require('./value-iterator');

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
    return new ValueIterator();
};
