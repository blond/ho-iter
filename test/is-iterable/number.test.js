'use strict';

const test = require('ava');

const isIterable = require('../../lib/is-iterable');

test('number should not be iterable', t => {
    const number = 123;

    t.false(isIterable(number));
});

test('zero number should not be iterable', t => {
    const number = 0;

    t.false(isIterable(number));
});

test('number object should not be iterable', t => {
    const number = new Number(123);

    t.false(isIterable(number));
});

test('NaN should not be iterable', t => {
    t.false(isIterable(NaN));
});
