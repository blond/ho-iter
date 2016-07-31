'use strict';

const test = require('ava');

const isIterable = require('../../lib/is-iterable');

test('array should be iterable', t => {
    const arr = [1, 2, 3];

    t.true(isIterable(arr));
});

test('empty array should be iterable', t => {
    const arr = [];

    t.true(isIterable(arr));
});

test('typed array should be iterable', t => {
    const arr = new Int8Array();

    t.true(isIterable(arr));
});

test('array-like object should not be iterable', t => {
    const arr = {
        0: 1,
        1: 2,
        2: 3,
        length: 3
    };

    t.false(isIterable(arr));
});
