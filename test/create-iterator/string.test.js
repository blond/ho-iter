'use strict';

const test = require('ava');

const createIterator = require('../../lib/create-iterator');

test('should create iterator with string charecters', t => {
    const iter = createIterator('str');

    t.deepEqual(Array.from(iter), ['s', 't', 'r']);
});

test('should create iterator from object string', t => {
    const iter = createIterator(new String('str'));

    t.deepEqual(Array.from(iter), ['s', 't', 'r']);
});

test('should create iterator with buffer items', t => {
    const iter = createIterator(new Buffer('str'));

    t.deepEqual(Array.from(iter), [115, 116, 114]);
});

test('should create empty iterator from empty string', t => {
    const iter = createIterator('');

    t.deepEqual(Array.from(iter), []);
});

test('should create iterator from empty buffer', t => {
    const iter = createIterator(new Buffer(''));

    t.deepEqual(Array.from(iter), []);
});
