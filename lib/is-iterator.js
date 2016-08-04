'use strict';

/**
 * Returns `true` if the specified object is iterator.
 *
 * @example
 * const isIterator = require('ho-iter').isIterator;
 *
 * const generator = function *() {};
 * const iterator = generator();
 *
 * isIterator(generator) // false
 * isIterator(iterator) // true
 *
 * @param  {*} iterator - the object to inspect.
 * @return {boolean}
 */
module.exports = (iterator) => Boolean(iterator) && typeof iterator.next === 'function';
