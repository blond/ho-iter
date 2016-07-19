'use strict';

const test = require('ava');

const createIterator = require('../../lib/create-iterator');
const ValueIterator = require('../../lib/value-iterator');

test('should provide iterator', t => {
    const iter = {
        next() {
            return { value: null, done: true };
        }
    };

    t.is(createIterator(iter), iter);
});

test('should create iterator by iterable protocol', t => {
    const iter = {
        [Symbol.iterator]() {
            return new ValueIterator(123);
        },
        next() {
            return { value: null, done: true };
        }
    };

    const createdIter = createIterator(iter);

    t.deepEqual(Array.from(createdIter), [123]);
});
