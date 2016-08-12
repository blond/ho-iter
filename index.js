'use strict';

const createIterator = require('./lib/create-iterator');

exports = (value) => createIterator(value, { strict: true });

exports.value = require('./lib/value');
exports.isIterable = require('./lib/is-iterable');
exports.isIterator = require('./lib/is-iterator');
exports.series = require('./lib/series');
exports.evenly = require('./lib/evenly');
exports.reverse = require('./lib/reverse');

module.exports = exports;
