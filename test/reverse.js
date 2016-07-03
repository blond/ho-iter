
const test = require('ava');

const reverse = require('../lib/reverse');


test('should return empty iterator', t => {
    const iter = reverse();

    t.is(iter.next().done, true);
});


test('should support empty iterator', t => {
    const emptyIter = new Set();

    const iter = reverse(emptyIter);

    t.is(iter.next().done, true);
});


test('should return reverse iterator', t => {
    const values = new Set([1, 2, 3, 4]);

    const iter = reverse(values);

    t.deepEqual(Array.from(iter), [4, 3, 2, 1]);
});