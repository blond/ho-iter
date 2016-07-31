'use strict';

const test = require('ava');

const isIterable = require('../../lib/is-iterable');

test('iterator should be iterable', t => {
    const iter = {
        next: () => ({ done: true, value: null })
    };

    t.false(isIterable(iter));
});

test('generator should be iterable', t => {
    const iter = (function *() {})();

    t.true(isIterable(iter));
});
