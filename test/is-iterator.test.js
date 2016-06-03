'use strict';

const test = require('ava');

const isIterator = require('../lib/is-iterator');

test('should return false', t => {
    t.false(isIterator());
});

test('object should not be iterator', t => {
    const obj = {};

    t.false(isIterator(obj));
});

test('generator obj should be iterator', t => {
    const iter = (function *() {})();

    t.true(isIterator(iter));
});

test('object from `Symbol.iterator` should be iterator', t => {
    const iter = [][Symbol.iterator]();

    t.true(isIterator(iter));
});

test('object with next function should be iterator', t => {
    const iter = { next: () => {} };

    t.true(isIterator(iter));
});

test('object with `next` and `throw `should be iterator', t => {
    const iter = { next: () => {}, throw: () => {} };

    t.true(isIterator(iter));
});

test('object with non-valid keys should be iterator', t => {
    const iter = { next: () => {}, _invoke: () => {} };

    t.true(isIterator(iter));
});
