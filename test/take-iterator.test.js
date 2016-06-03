'use strict';

const test = require('ava');

const isIterator = require('../lib/is-iterator');
const takeIterator = require('../lib/take-iterator');

test('should return iterator', t => {
    const iter = { next: () => {} };

    t.is(takeIterator(iter), iter);
});

test('should take iterator from iterable', t => {
    const iterable = new Set();

    const iter = takeIterator(iterable);

    t.true(isIterator(iter));
});

test('should not return not iterator', t => {
    const obj = {};

    t.is(takeIterator(obj), undefined);
});
