'use strict';

const test = require('ava');

const isIterable = require('../lib/is-iterable');

test('string should be iterable', t => {
    const str = 'hello world';

    t.true(isIterable(str));
});

test('array should be iterable', t => {
    const arr = [1, 2, 3];

    t.true(isIterable(arr));
});

test('set should be iterable', t => {
    const set = new Set([1, 2, 3]);

    t.true(isIterable(set));
});

test('map should be iterable', t => {
    const map = new Map([['key', 'value']]);

    t.true(isIterable(map));
});

test('should return false', t => {
    t.false(isIterable());
});

test('undefined should not be iterable', t => {
    t.false(isIterable(undefined));
});

test('null should not be iterable', t => {
    t.false(isIterable(null));
});

test('number should not be iterable', t => {
    const number = 1;

    t.false(isIterable(number));
});
