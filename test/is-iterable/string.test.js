'use strict';

const test = require('ava');

const isIterable = require('../../lib/is-iterable');

test('string should be iterable', t => {
    const str = 'str';

    t.true(isIterable(str));
});

test('string object should be iterable', t => {
    const str = new String('str');

    t.true(isIterable(str));
});

test('empty string should be iterable', t => {
    const str = '';

    t.true(isIterable(str));
});

test('zero string should be iterable', t => {
    const str = '0';

    t.true(isIterable(str));
});
