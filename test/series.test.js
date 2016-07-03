'use strict';

const test = require('ava');

const series = require('../lib/series');
const done = require('../lib/done');

const createIter = (vals) => (new Set(vals)).values();

test('should return empty iterator', t => {
    const iter = series();

    t.deepEqual(iter.next(), done());
});

test('should support empty iterator', t => {
    const emptyIter = { next: () => (done()) };

    const iter = series(emptyIter);

    t.deepEqual(iter.next(), done());
});

test('should return equal iterator', t => {
    const values = (new Set([1, 2])).values();

    const iter = series(values);

    t.deepEqual(Array.from(iter), [1, 2]);
});

test('should support iterable', t => {
    const iterable = [1, 2];

    const iter = series(iterable);

    t.deepEqual(Array.from(iter), iterable);
});

test('should concat iterators', t => {
    const values1 = (new Set([1, 2])).values();
    const values2 = (new Set([3, 4])).values();

    const iter = series(values1, values2);

    t.deepEqual(Array.from(iter), [1, 2, 3, 4]);
});

test('should concat iterators with empty iterator', t => {
    const emptyIter = { next: () => ({ done: true }) };
    const values1 = (new Set([1, 2])).values();
    const values2 = (new Set([3, 4])).values();

    const iter = series(values1, emptyIter, values2);

    t.deepEqual(Array.from(iter), [1, 2, 3, 4]);
});

test('should concat equal iterators', t => {
    const set = new Set([1, 2]);

    const iter = series(set.values(), set.values());

    t.deepEqual(Array.from(iter), [1, 2, 1, 2]);
});

test('should traverse the same iterator once', t => {
    const values = createIter([1, 2]);

    // redundant
    const iter = series(values, values);

    t.deepEqual(Array.from(iter), [1, 2]);
});

test('nul 12', t => {
    const iter = series(null, createIter([1, 2]));

    t.deepEqual(Array.from(iter), [1, 2]);
});

test('12 null 34', t => {
    const iter = series(createIter([1, 2]), null, createIter([3, 4]));

    t.deepEqual(Array.from(iter), [1, 2, 3, 4]);
});

test('nulnul 12', t => {
    const iter = series(null, null, createIter([1, 2]));

    t.deepEqual(Array.from(iter), [1, 2]);
});

test('null 12 nulnul 34', t => {
    const iter = series(null, createIter([1, 2]), null, null, createIter([3, 4]));

    t.deepEqual(Array.from(iter), [1, 2, 3, 4]);
});

test('null empty nulnul 12', t => {
    const iter = series(null, createIter(), null, null, createIter([1, 2]));

    t.deepEqual(Array.from(iter), [1, 2]);
});

test('nulls', t => {
    const iter = series(null, null, null);

    t.deepEqual(Array.from(iter), []);
});
