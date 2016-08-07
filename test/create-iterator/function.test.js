'use strict';

const test = require('ava');

const createIterator = require('../../lib/create-iterator');

test('should throw error if value is function', t => {
    const foo = function () {};

    t.throws(() => createIterator(foo));
});

test('should throw error if value is generator function', t => {
    const generatorFunction = function* () {
        yield 1;
    };

    t.throws(() => createIterator(generatorFunction));
});

test('should create iterator from generator', t => {
    const generator = (function* () {
        yield 1;
    }());

    const iter = createIterator(generator);

    t.deepEqual(Array.from(iter), [1]);
});
