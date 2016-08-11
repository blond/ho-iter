'use strict';

const test = require('ava');

const evenly = require('../../lib/evenly');

test('should create empty iterator', t => {
    const iter = evenly([]);

    t.deepEqual(Array.from(iter), []);
});

test('should concat empty arrays', t => {
    const iter = evenly([], [], []);

    t.deepEqual(Array.from(iter), []);
});

test('should concat array items', t => {
    const iter = evenly([1, 2], [3, 4]);

    t.deepEqual(Array.from(iter), [1, 3, 2, 4]);
});

test('should concat arrays with empty arrays', t => {
    const iter = evenly([], [1, 2], [], [3, 4], []);

    t.deepEqual(Array.from(iter), [1, 3, 2, 4]);
});
