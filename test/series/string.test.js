'use strict';

const test = require('ava');

const series = require('../../lib/series');

test('should create iterator with characters', t => {
    const iter = series('str');

    t.deepEqual(Array.from(iter), ['s', 't', 'r']);
});

test('should create empty iterator', t => {
    const iter = series('');

    t.deepEqual(Array.from(iter), []);
});

test('should concat empty strings', t => {
    const iter = series('', '', '');

    t.deepEqual(Array.from(iter), []);
});

test('should concat string characters', t => {
    const iter = series('str1', 'str2');

    t.deepEqual(Array.from(iter), ['s', 't', 'r', '1', 's', 't', 'r', '2']);
});

test('should concat string characters with epmty strings', t => {
    const iter = series('', 'str1', '', 'str2', '');

    t.deepEqual(Array.from(iter), ['s', 't', 'r', '1', 's', 't', 'r', '2']);
});
