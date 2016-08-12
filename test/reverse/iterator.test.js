'use strict';

const test = require('ava');

const reverse = require('../../lib/reverse');
const createIterator = require('../../lib/create-iterator');

test('should return empty iterator', t => {
    const iter = reverse();

    t.deepEqual(iter.next(), { done: true });
});

test('should support empty iterator', t => {
    const emptyIter = createIterator();

    const iter = reverse(emptyIter);

    t.deepEqual(iter.next(), { done: true });
});

test('should reverse iterator', t => {
    const iter = createIterator([1, 2]);

    const reverseIter = reverse(iter);

    t.deepEqual(Array.from(reverseIter), [2, 1]);
});

test('should support iterable', t => {
    const iterable = [1, 2];

    const reverseIter = reverse(iterable);

    t.deepEqual(Array.from(reverseIter), [2, 1]);
});
