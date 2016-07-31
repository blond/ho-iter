'use strict';

const test = require('ava');

const isIterable = require('../../lib/is-iterable');

test('empty object should not be iterable', t => {
    const object = {};

    t.false(isIterable(object));
});

test('object should not be iterable', t => {
    const object = { iterable: true };

    t.false(isIterable(object));
});
