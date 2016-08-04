'use strict';

/**
 * Returns `true` if the specified object implements the Iterator protocol via implementing a `Symbol.iterator`.
 *
 * @example
 * const isIterable = require('ho-iter').isIterable;
 *
 * isIterable([1, 2, 3]); // true
 * isIterable(123); // false
 *
 * @param  {*} iterable - a value which might implement the Iterable protocol.
 * @return {boolean}
 */
module.exports = (iterable) => iterable != null && typeof iterable[Symbol.iterator] === 'function';
