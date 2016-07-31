'use strict';

const test = require('ava');

const isIterable = require('../../lib/is-iterable');

test('null should not be iterable', t => {
    t.false(isIterable(null));
});

test('undefined should not be iterable', t => {
    t.false(isIterable(undefined));
});
