'use strict';

const test = require('ava');

const isIterator = require('../../lib/is-iterator');
const done = require('../../lib/done');

test('iterable object should not be iterator', t => {
    const iterable = {
        [Symbol.iterator]() {
            return {
                next: () => (done)
            };
        }
    };

    t.false(isIterator(iterable));
});

test('array should not be iterator', t => {
    const arr = [1, 2, 3];

    t.false(isIterator(arr));
});

test('set should not be iterator', t => {
    const set = new Set([1, 2, 3]);

    t.false(isIterator(set));
});

test('map should not be iterator', t => {
    const map = new Map([[1, 2]]);

    t.false(isIterator(map));
});

test('generator should not be iterator', t => {
    const iterable = function *() {};

    t.false(isIterator(iterable));
});

test('generator result should not be iterator', t => {
    const iter = (function *() {})();

    t.true(isIterator(iter));
});
