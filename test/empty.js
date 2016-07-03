
const test = require('ava');

const empty = require('../lib/empty');


test('should return empty iterator', t => {
    const iter = empty();

    t.is(iter.next().done, true);
});
