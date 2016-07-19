'use strict';

const test = require('ava');

const series = require('../lib/series');
const takeIterator = require('../lib/take-iterator');
const empty = require('../lib/empty');
const done = require('../lib/done');

test('should return empty iterator', t => {
    const iter = series();

    t.deepEqual(iter.next(), done());
});

test('should support empty iterator', t => {
    const emptyIter = empty();

    const iter = series(emptyIter);

    t.deepEqual(iter.next(), done());
});

test('should return equal iterator', t => {
    const iter = takeIterator([1, 2]);

    const seriesIter = series(iter);

    t.deepEqual(Array.from(seriesIter), [1, 2]);
});

test('should support iterable', t => {
    const iterable = [1, 2];

    const seriesIter = series(iterable);

    t.deepEqual(Array.from(seriesIter), iterable);
});

test('should concat iterators', t => {
    const iter1 = takeIterator([1, 2]);
    const iter2 = takeIterator([3, 4]);

    const seriesIter = series(iter1, iter2);

    t.deepEqual(Array.from(seriesIter), [1, 2, 3, 4]);
});

test('should concat iterators with empty iterator', t => {
    const iter1 = takeIterator([1, 2]);
    const iter2 = takeIterator([3, 4]);

    const seriesIter = series(iter1, empty(), iter2);

    t.deepEqual(Array.from(seriesIter), [1, 2, 3, 4]);
});

test('should concat equal iterators', t => {
    const iter1 = takeIterator([1, 2]);
    const iter2 = takeIterator([1, 2]);

    const seriesIter = series(iter1, iter2);

    t.deepEqual(Array.from(seriesIter), [1, 2, 1, 2]);
});

test('should traverse the same iterator once', t => {
    const iter = takeIterator([1, 2]);

    const seriesIter = series(iter, iter);

    t.deepEqual(Array.from(seriesIter), [1, 2]);
});
