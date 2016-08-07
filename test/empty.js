'use strict';

const test = require('ava');

const empty = require('../lib/empty');
const isIterator = require('../lib/is-iterator');

test('should return empty iterator', t => {
    const iter = empty();

    t.is(iter.next().done, true);
});

test('should return empty iterator every time', t => {
    const iter = empty();

    iter.next();
    iter.next();

    t.is(iter.next().done, true);
});

test('should be iterable', t => {
    const iter = empty();
    const iterable = iter[Symbol.iterator]();

    t.true(isIterator(iterable));
});
