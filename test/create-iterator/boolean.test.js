'use strict';

const test = require('ava');

const createIterator = require('../../lib/create-iterator');

test('should throw error if value is `true`', t => {
    const boolean = true;

    t.throws(() => createIterator(boolean));
});

test('should throw error if value is boolean object', t => {
    const boolean = new Boolean(true);

    t.throws(() => createIterator(boolean));
});

test('should throw error if value is `false`', t => {
    const boolean = new Boolean(false);

    t.throws(() => createIterator(boolean));
});
