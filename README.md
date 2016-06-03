Higher-Order Iterator
=====================

[![NPM Status][npm-img]][npm]
[![Travis Status][test-img]][travis]
[![Coverage Status][coverage-img]][coveralls]
[![Dependency Status][dependency-img]][david]

[npm]:            https://www.npmjs.org/package/ho-iter
[npm-img]:        https://img.shields.io/npm/v/ho-iter.svg

[travis]:         https://travis-ci.org/blond/ho-iter
[test-img]:       https://img.shields.io/travis/blond/ho-iter.svg?label=tests

[coveralls]:      https://coveralls.io/r/blond/ho-iter
[coverage-img]:   https://img.shields.io/coveralls/blond/ho-iter.svg

[david]:          https://david-dm.org/blond/ho-iter
[dependency-img]: http://img.shields.io/david/blond/ho-iter.svg

The iterator which takes iterators as arguments and returns an iterator.

> [Iterators and Generators Guide](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Iterators_and_Generators)

Install
-------

```
$ npm install --save ho-iter
```

Usage
-----

```js
const series = require('ho-iter').series;

const set1 = new Set([1, 2]);
const set2 = new Set([3, 4, 5]);

for (let item of series(set1, set2)) { console.log(item) } // 1 2 3 4 5
```

API
---

### series(...iterators)

Returns an Iterator, that traverses iterators in series.

This is reminiscent of the concatenation of arrays.

**Example:**

```js
const series = require('ho-iter').series;

const arr1 = [1, 2];
const arr2 = [3, 4];

const set1 = new Set([1, 2]);
const set2 = new Set([3, 4]);

[].concat(arr1, arr2); // [1, 2, 3, 4]

for (let item of series(set1, set2)) { console.log(item) } // 1 2 3 4
```

License
-------

MIT © [Andrew Abramov](https://github.com/blond)
