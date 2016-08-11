'use strict';

const test = require('ava');

const createIterator = require('../../lib/create-iterator');

test('should create iterator with primitive value if strict mode turn off', t => {
    const value = 123;

    const iter = createIterator(value, { strict: false });

    t.deepEqual(Array.from(iter), [123]);
});
