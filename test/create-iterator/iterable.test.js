'use strict';

const test = require('ava');

const createIterator = require('../../lib/create-iterator');

test('should create iterator with array items', t => {
    const arr = [1, 2, 3];

    const iter = createIterator(arr);

    t.deepEqual(Array.from(iter), [1, 2, 3]);
});

test('should create iterator from typed array', t => {
    const arr = new Int8Array(3);

    const iter = createIterator(arr);

    t.deepEqual(Array.from(iter), [0, 0, 0]);
});

test('should create iterator with set values', t => {
    const iterable = new Set([1, 2, 3]);

    const iter = createIterator(iterable);

    t.deepEqual(Array.from(iter), [1, 2, 3]);
});

test('should create iterator with map key-values', t => {
    const iterable = new Map([['key', 'val']]);

    const iter = createIterator(iterable);

    t.deepEqual(Array.from(iter), [['key', 'val']]);
});

test('should create iterator with arguments', t => {
    let iter;

    (function (arg1, arg2) { // eslint-disable-line no-unused-vars
        iter = createIterator(arguments);
    })('arg1', 'arg2');

    t.deepEqual(Array.from(iter), ['arg1', 'arg2']);
});
