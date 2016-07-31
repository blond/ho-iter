'use strict';

const test = require('ava');

const isIterable = require('../../lib/is-iterable');

test('true should not be iterable', t => {
    const flag = true;

    t.false(isIterable(flag));
});

test('false should not be iterable', t => {
    const flag = false;

    t.false(isIterable(flag));
});

test('boolean object should not be iterable', t => {
    const flag = new Boolean(true);

    t.false(isIterable(flag));
});
