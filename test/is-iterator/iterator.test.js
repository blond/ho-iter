'use strict';

const test = require('ava');

const isIterator = require('../../lib/is-iterator');

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
