'use strict';

const createIterator = require('./lib/create-iterator');

createIterator.isIterable = require('./lib/is-iterable');
createIterator.isIterator = require('./lib/is-iterator');

createIterator.series = require('./lib/series');
createIterator.evenly = require('./lib/evenly');

module.exports = createIterator;
