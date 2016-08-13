'use strict';

const test = require('ava');

const reverse = require('../../lib/reverse');

test('should throw error if value is `null`', t => {
    t.throws(() => reverse(null));
});

test('should throw error if value is `undefined`', t => {
    t.throws(() => reverse(undefined));
});

test('should throw error if value is number', t => {
    t.throws(() => reverse(123));
});

test('should throw error if value is boolean', t => {
    t.throws(() => reverse(true));
});

test('should reverse string characters', t => {
    const iter = reverse('str');

    t.deepEqual(Array.from(iter), ['r', 't', 's']);
});
