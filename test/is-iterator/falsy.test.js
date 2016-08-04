'use strict';

const test = require('ava');

const isIterator = require('../../lib/is-iterator');

test('should return false', t => {
    t.false(isIterator());
});

test('undefined should should not be iterator', t => {
    t.false(isIterator(undefined));
});

test('null should should not be iterator', t => {
    t.false(isIterator(null));
});

test('empty object should not be iterator', t => {
    const obj = {};

    t.false(isIterator(obj));
});
