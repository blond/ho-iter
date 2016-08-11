'use strict';

const createIterator = require('./lib/create-iterator');

createIterator.value = require('./lib/value');

createIterator.isIterable = require('./lib/is-iterable');
createIterator.isIterator = require('./lib/is-iterator');

createIterator.series = require('./lib/series');
createIterator.evenly = require('./lib/evenly');

module.exports = (value) => createIterator(value, { strict: true });
