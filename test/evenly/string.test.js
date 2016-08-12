'use strict';

const test = require('ava');

const evenly = require('../../lib/evenly');

test('should create iterator with characters', t => {
    const iter = evenly('str');

    t.deepEqual(Array.from(iter), ['s', 't', 'r']);
});

test('should create empty iterator', t => {
    const iter = evenly('');

    t.deepEqual(Array.from(iter), []);
});

test('should concat empty strings', t => {
    const iter = evenly('', '', '');

    t.deepEqual(Array.from(iter), []);
});

test('should concat string characters', t => {
    const iter = evenly('str1', 'str2');

    t.deepEqual(Array.from(iter), ['s', 's', 't', 't', 'r', 'r', '1', '2']);
});

test('should concat string characters with epmty strings', t => {
    const iter = evenly('', 'str1', '', 'str2', '');

    t.deepEqual(Array.from(iter), ['s', 's', 't', 't', 'r', 'r', '1', '2']);
});
