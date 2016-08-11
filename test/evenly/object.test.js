'use strict';

const test = require('ava');

const evenly = require('../../lib/evenly');

test('should create empty iterator', t => {
    const iter = evenly({});

    t.deepEqual(Array.from(iter), []);
});

test('should concat empty arrays', t => {
    const iter = evenly({}, {}, {});

    t.deepEqual(Array.from(iter), []);
});

test('should concat object entries', t => {
    const iter = evenly({ foo: 'bar' }, { baz: 42 });

    t.deepEqual(Array.from(iter), [['foo', 'bar'], ['baz', 42]]);
});

test('should concat object entries with empty objects', t => {
    const iter = evenly({}, { foo: 'bar' }, {}, { baz: 42 }, {});

    t.deepEqual(Array.from(iter), [['foo', 'bar'], ['baz', 42]]);
});
