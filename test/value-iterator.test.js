'use strict';

const test = require('ava');

const ValueIterator = require('../lib/value-iterator');
const isIterable = require('../lib/is-iterable');

test('should create empty iterator', t => {
    const iter = new ValueIterator();

    t.is(iter.next().done, true);
    t.is(iter.next().done, true);
});

test('should be iterable', t => {
    const iter = new ValueIterator();

    t.true(isIterable(iter));
});

function macro(t, value) {
    const iter = new ValueIterator(value);

    t.is(iter.next().value, value);

    t.is(iter.next().done, true);
    t.is(iter.next().done, true);
}

test('should create one item iterator with `null`', macro, null);
test('should create one item iterator with `undefined`', macro, undefined);
test('should create one item iterator with `false`', macro, false);
test('should create one item iterator with empty string', macro, '');
test('should create one item iterator with zero number', macro, 0);

test('should create one item iterator with `true`', macro, true);
test('should create one item iterator with string', macro, 'str');
test('should create one item iterator with number', macro, 123);

test('should create one item iterator with object', macro, {});
test('should create one item iterator with array', macro, [1, 2, 3]);
