'use strict';

const test = require('ava');

const createIterator = require('../../lib/create-iterator');

test('should create empty iterator if value is not specified', t => {
    const iter = createIterator();

    t.deepEqual(Array.from(iter), []);
});

test('should throw error if value is `undefined`', t => {
    t.throws(() => createIterator(undefined));
});

test('should throw error if value is `null`', t => {
    t.throws(() => createIterator(null));
});
