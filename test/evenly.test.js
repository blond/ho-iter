'use strict';

const test = require('ava');

const evenly = require('../lib/evenly');
const takeIterator = require('../lib/take-iterator');
const empty = require('../lib/empty');
const done = require('../lib/done');

test('should return empty iterator', t => {
    const iter = evenly();

    t.deepEqual(iter.next(), done());
});

test('should support empty iterator', t => {
    const emptyIter = empty();

    const iter = evenly(emptyIter);

    t.deepEqual(iter.next(), done());
});

test('should return equal iterator', t => {
    const iter = takeIterator([1, 2]);

    const evenlyIter = evenly(iter);

    t.deepEqual(Array.from(evenlyIter), [1, 2]);
});

test('should support iterable', t => {
    const iterable = [1, 2];

    const evenlyIter = evenly(iterable);

    t.deepEqual(Array.from(evenlyIter), iterable);
});

test('should traverse iterators', t => {
    const iter1 = takeIterator([1, 2]);
    const iter2 = takeIterator([3, 4]);

    const evenlyIter = evenly(iter1, iter2);

    t.deepEqual(Array.from(evenlyIter), [1, 3, 2, 4]);
});

test('should traverse iterators with empty iterator', t => {
    const iter1 = takeIterator([1, 2]);
    const iter2 = takeIterator([3, 4]);

    const evenlyIter = evenly(iter1, empty(), iter2);

    t.deepEqual(Array.from(evenlyIter), [1, 3, 2, 4]);
});

test('should traverse equal iterators', t => {
    const iter1 = takeIterator([1, 2]);
    const iter2 = takeIterator([1, 2]);

    const evenlyIter = evenly(iter1, iter2);

    t.deepEqual(Array.from(evenlyIter), [1, 1, 2, 2]);
});

test('should traverse the same iterator once', t => {
    const iter = takeIterator([1, 2]);

    const evenlyIter = evenly(iter);

    t.deepEqual(Array.from(evenlyIter), [1, 2]);
});
