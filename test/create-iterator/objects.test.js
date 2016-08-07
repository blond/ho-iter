'use strict';

const test = require('ava');

const createIterator = require('../../lib/create-iterator');

test('should create empty iterator from empty object', t => {
    const obj = {};

    const iter = createIterator(obj);

    t.deepEqual(Array.from(iter), []);
});

test('should create iterator with object key-values', t => {
    const obj = {
        key1: 'val1',
        key2: 'val2'
    };

    const iter = createIterator(obj);

    t.deepEqual(Array.from(iter), [['key1', 'val1'], ['key2', 'val2']]);
});

test('should throw error if value is promise', t => {
    const promise = Promise.resolve('ok');

    t.throws(() => createIterator(promise));
});

test('should throw error if value is date', t => {
    const date = new Date();

    t.throws(() => createIterator(date));
});

test('should throw error if value is error', t => {
    const error = new Error();

    t.throws(() => createIterator(error));
});
