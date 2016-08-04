'use strict';

const isIterable = require('./lib/is-iterable');
const isIterator = require('./lib/is-iterator');

const empty = require('./lib/empty');

const series = require('./lib/series');
const evenly = require('./lib/evenly');

module.exports = {
    isIterable, isIterator,
    empty,
    series, evenly
};
