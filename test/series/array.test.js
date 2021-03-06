'use strict';

const test = require('ava');

const series = require('../../lib/series');

test('should create empty iterator', t => {
    const iter = series([]);

    t.deepEqual(Array.from(iter), []);
});

test('should concat empty arrays', t => {
    const iter = series([], [], []);

    t.deepEqual(Array.from(iter), []);
});

test('should concat array items', t => {
    const iter = series([1, 2], [3, 4]);

    t.deepEqual(Array.from(iter), [1, 2, 3, 4]);
});

test('should concat arrays with empty arrays', t => {
    const iter = series([], [1, 2], [], [3, 4], []);

    t.deepEqual(Array.from(iter), [1, 2, 3, 4]);
});
