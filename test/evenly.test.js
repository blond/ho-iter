'use strict';

const test = require('ava');

const evenly = require('../lib/evenly');

const DONE = { value: null, done: true };

test('should return empty iterator', t => {
    const iter = evenly();

    t.deepEqual(iter.next(), DONE);
});

test('should support empty iterator', t => {
    const emptyIter = { next: () => (DONE) };

    const iter = evenly(emptyIter);

    t.deepEqual(iter.next(), DONE);
});

test('should return equal iterator', t => {
    const values = (new Set([1, 2])).values();

    const iter = evenly(values);

    t.deepEqual(Array.from(iter), [1, 2]);
});

test('should support iterable', t => {
    const iterable = [1, 2];

    const iter = evenly(iterable);

    t.deepEqual(Array.from(iter), iterable);
});

test('should traverse iterators', t => {
    const values1 = (new Set([1, 2])).values();
    const values2 = (new Set([3, 4])).values();

    const iter = evenly(values1, values2);

    t.deepEqual(Array.from(iter), [1, 3, 2, 4]);
});

test('should traverse iterators with empty iterator', t => {
    const emptyIter = { next: () => ({ done: true }) };
    const values1 = (new Set([1, 2])).values();
    const values2 = (new Set([3, 4])).values();

    const iter = evenly(values1, emptyIter, values2);

    t.deepEqual(Array.from(iter), [1, 3, 2, 4]);
});

test('should traverse equal iterators', t => {
    const set = new Set([1, 2]);

    const iter = evenly(set.values(), set.values());

    t.deepEqual(Array.from(iter), [1, 1, 2, 2]);
});

test('should traverse the same iterator once', t => {
    const values = (new Set([1, 2])).values();

    const iter = evenly(values, values);

    t.deepEqual(Array.from(iter), [1, 2]);
});
