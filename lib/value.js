'use strict';

const ValueIterator = require('./value-iterator');

/**
 * Creates iterator with specified value.
 *
 * @example
 * const hoi = require('ho-iter');
 *
 * const iter = hoi.value(123);
 *
 * iter.next(); // { value: 123, done: false }
 * iter.next(); // { value: null, done: true }
 *
 * @param {*} value — the value which will be in created iterator.
 * @returns {ValueIterator}
 */
module.exports = (value) => new ValueIterator(value);
