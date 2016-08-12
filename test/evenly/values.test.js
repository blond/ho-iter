'use strict';

const test = require('ava');

const evenly = require('../../lib/evenly');

test('should create iterator with `null`', t => {
    const iter = evenly(null);

    t.deepEqual(Array.from(iter), [null]);
});

test('should create iterator with `undefined`', t => {
    const iter = evenly(undefined);

    t.deepEqual(Array.from(iter), [undefined]);
});

test('should create iterator with numbers', t => {
    const iter = evenly(0, 1, 2, 3);

    t.deepEqual(Array.from(iter), [0, 1, 2, 3]);
});

test('should create iterator with boolean values', t => {
    const iter = evenly(true, false);

    t.deepEqual(Array.from(iter), [true, false]);
});

test('should create iterator with falsy values', t => {
    const iter = evenly(0, '', false, null, undefined);

    t.deepEqual(Array.from(iter), [0, false, null, undefined]);
});
