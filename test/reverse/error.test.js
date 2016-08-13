'use strict';

const test = require('ava');

const reverse = require('../../lib/reverse');
const createIterator = require('../../lib/create-iterator');

test('should throw error if specified two arguments', t => {
    const iter1 = createIterator([1, 2, 3]);
    const iter2 = createIterator([4, 5, 6]);

    t.throws(
        () => reverse(iter1, iter2),
        'The `resolve()` method not support more than one argument. Use `series() or `evenly()` to combine iterators.'
    );
});
