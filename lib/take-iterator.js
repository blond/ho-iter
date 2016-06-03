'use strict';

const isIterator = require('./is-iterator');
const isIterable = require('./is-iterable');

/**
 * Takes iterator from iterable objects or return iterator.
 *
 * @param {*} iter - iterable object or iterator.
 * @returns {Iterator|undefined}
 */
module.exports = (iter) => {
    if (isIterator(iter)) {
        return iter;
    }

    if (isIterable(iter)) {
        return iter[Symbol.iterator]();
    }
};
