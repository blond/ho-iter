'use strict';

const test = require('ava');

const createIterator = require('../../lib/create-iterator');

test('should throw error if value is `Symbol`', t => {
    const symbol = Symbol('str');

    t.throws(() => createIterator(symbol));
});
