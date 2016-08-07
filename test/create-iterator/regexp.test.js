'use strict';

const test = require('ava');

const createIterator = require('../../lib/create-iterator');

test('should throw error if value is regexp', t => {
    const regexp = /\w+/;

    t.throws(() => createIterator(regexp));
});

test('should throw error if value is regexp object', t => {
    const regexp = new RegExp('\\w+');

    t.throws(() => createIterator(regexp));
});
