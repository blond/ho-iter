'use strict';

const kindOf = require('kind-of');
const isPromise = require('is-promise');
const isError = require('is-error');

const isIterable = require('./is-iterable');
const isIterator = require('./is-iterator');

const ValueIterator = require('./value-iterator');
const ObjectEntriesIterator = require('./object-entries-iterator');

/**
 * Creates iterator with specified value or iterable object.
 *
 * If value is not specified, returns empty iterator.
 *
 * @param {*} value - primitive value, object or iterable object.
 * @returns {Iterator}
 */
module.exports = function(value) {
    if (arguments.length === 0) {
        return new ValueIterator();
    }

    const type = kindOf(value);

    if (isIterable(value)) {
        return value[Symbol.iterator]();
    }

    if (isIterator(value)) {
        return value;
    }

    if (type === 'object' && !isPromise(value) && !isError(value)) {
        return new ObjectEntriesIterator(value);
    }

    throw new Error(`It is impossible to create iterator: \`${value}\` is not iterable object.`);
};
