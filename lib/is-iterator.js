'use strict';

/**
 * Checks if `obj` is iterator.
 *
 * @param  {*} obj - some object.
 * @return {boolean}
 */
module.exports = (obj) => Boolean(obj) && typeof obj.next === 'function';
