'use strict';

/**
 * Checks if `obj` is iterable.
 *
 * @param  {*} obj - some object.
 * @return {boolean}
 */
module.exports = (obj) => Boolean(obj) && typeof obj[Symbol.iterator] === 'function';
