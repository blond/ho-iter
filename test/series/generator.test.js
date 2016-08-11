'use strict';

const test = require('ava');

const series = require('../../lib/series');

test('should create empty iterator', t => {
    const generator = (function* () {}());

    const iter = series(generator);

    t.deepEqual(Array.from(iter), []);
});

test('should concat empty generators', t => {
    const generator1 = (function* () {}());
    const generator2 = (function* () {}());

    const iter = series(generator1, generator2);

    t.deepEqual(Array.from(iter), []);
});

test('should create iterator with generator items', t => {
    const generator = (function* () {
        yield 1;
        yield 2;
        yield 3;
    }());

    const iter = series(generator);

    t.deepEqual(Array.from(iter), [1, 2, 3]);
});

test('should concat generator with empty generators', t => {
    const generator1 = (function* () {}());
    const generator2 = (function* () {
        yield 1;
        yield 2;
        yield 3;
    }());
    const generator3 = (function* () {}());

    const iter = series(generator1, generator2, generator3);

    t.deepEqual(Array.from(iter), [1, 2, 3]);
});
