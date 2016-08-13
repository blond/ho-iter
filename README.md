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
const hoi = require('ho-iter');

const entries1 = hoi({ foo: 'bar' });
const entries2 = hoi({ baz: 42 });

const keys = [];
const values = [];

for (let [key, value] of hoi.series(entries1, entries2)) {
    keys.push(key);
    values.push(value);
}

console.log(`keys: ${keys}`);
console.log(`values: ${values}`);

// ➜ keys: [foo, baz]
// ➜ values: [bar, 42]
```

API
---

Create iterator:

* [hoi(iterable)](#hoiiterable)
* [hoi(iterator)](#hoiiterator)
* [hoi(object)](#hoiobject)
* [hoi(number|boolean|symbol|regexp|function)](#hoinumberbooleansymbolregexpfunction)

Helpers:

* [value(value)](#valuevalue)
* [isIterable(iterable)](#isiterableiterable)
* [isIterator(iterator)](#isiteratoriterator)
* [series(...iterables)](#seriesiterators)
* [evenly(...iterables)](#evenlyiterators)
* [reverse(iterable)](#reverseiterable)

### hoi(iterable)

Creates iterator for iterable object.

Uses [Iterable protocol](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols) to create iterator.

Iterable data structures:

* [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)
* [TypedArray](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray)
* [Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set), [WeakSet](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakSet)
* [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map), [WeakMap](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap)
* [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)
* [arguments](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/arguments)

**Example 1.** Create iterator with array items.

```js
const hoi = require('ho-iter');

const iter = hoi([1, 2, 3, 4]);

for (let item of iter) {
    console.log(item);
}

// ➜ 1
// ➜ 2
// ➜ 3
// ➜ 4
```

**Example 2.** Create iterator with set values.

```js
const hoi = require('ho-iter');

const set = new Set([1, 2, 3, 4]);
const iter = hoi(set);

for (let item of iter) {
    console.log(item);
}

// ➜ 1
// ➜ 2
// ➜ 3
// ➜ 4
```

**Example 3.** Create iterator with map entries.

```js
const hoi = require('ho-iter');

const map = new Map();

map.set('key1', 'val1');
map.set('key2', 'val2');

const iter = hoi(map);

for (let [key, val] of iter) {
    console.log(`key: ${key}, val: ${val}`);
}

// ➜ key: key1, val: val1
// ➜ key: key2, val: val2
```

**Example 3.** Create iterator with string characters.

```js
const hoi = require('ho-iter');

const iter = hoi('Iterate me!');

for (let char of iter) {
    console.log(char);
}

// ➜ I
// ➜ t
// ➜ e
// ➜ r
// ➜ a
// ➜ t
// ➜ e
// ➜
// ➜ m
// ➜ e
// ➜ !
```

**Important:** If you want to create iterator with integral string use `hoi.value(string)` helper.

```js
const hoi = require('ho-iter');

const iter = hoi.value("Don’t touch me!");

for (let item of iter) {
    console.log(item);
}

// ➜ Don’t touch me!
```

**Example 4.** Creates iterator with arguments.

```js
const hoi = require('ho-iter');

const iter = hoi.value("Don't touch me!");

function foo(arg1, arg2) {
    const iter = hoi(arguments);

    for (let arg of iter) {
        console.log(arg);
    }
}

foo('bar', 'baz');

// ➜ bar
// ➜ baz
```

**Example 5.** Create empty iterator.

If value is not specified, returns empty iterator.

The empty iterator just returns `done` for each call.

```js
const hoi = require('ho-iter');

const iter = hoi();

iter.next();

// ➜ { done: true, value: null }
```

### hoi(iterator)

Provides specified iterator or creates iterator by [Iterable protocol](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols).

**Important:** If iterator does not support [Iterable protocol](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols) then `hoi(iterator)` does not clone specified iterator.

```js
const hoi = require('ho-iter');

function makeIterator(array) {
    let nextIndex = 0;

    return {
        next() {
            return nextIndex < array.length ?
                { value: array[nextIndex++], done: false } :
                { done: true };
        }
    }
}

const iter = makeIterator([1, 2, 3]);

iter.next(); // { value: 1, done: false }
iter.next(); // { value: 1, done: false }
iter.next(); // { value: 1, done: false }
iter.next(); // { done: true }

const hoIter = hoi(iter); // iterator will not be clonned

// ➜ { done: true }
```

### hoi(object)

Creates an iterator whose elements are arrays corresponding to the enumerable property [key, value] pairs found directly upon object.

The ordering of the properties is the same as that given by looping over the property values of the object manually.

This is reminiscent of the [Object.entries](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries) method or [Map[iterator]](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/@@iterator).

**Important:** [Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object) does not [Iterable protocol](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols) in `ES2015`.

```js
const hoi = require('ho-iter');

const iter = hoi({
    foo: 'bar',
    baz: 42
});

for (let [key, val] of iter) {
    console.log(`key: ${key}, val: ${val}`);
}

// ➜ key: foo, val: bar
// ➜ key: baz, val: 42
```

**Important:** If you want to create iterator with integral object use [hoi.value(object)](#valuevalue) helper.

```js
const hoi = require('ho-iter');

const iter = hoi.value({ foo: 'bar' });

for (let item of iter) {
    console.log(item);
}

// ➜ { foo: 'bar' }
```

### hoi(number|boolean|symbol|regexp|function)

If value is not iterable then throws error:

```
It is impossible to create iterator: `value` is not iterable object.
```

Not iterable data structures:

* [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)
* [Boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)
* [Symbol](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol)
* [Function](https://developer.mozilla.org/en-US/docs/Glossary/Function)
* [RegExp](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/RegExp)

```js
const hoi = require('ho-iter');

const iter = hoi(null);

// It is impossible to create iterator: `null` is not iterable object.
```

Use [hoi.value(value)](#valuevalue) to create iterator with one value.

### Helpers

* [value(value)](#valuevalue)
* [isIterable(iterable)](#isiterableiterable)
* [isIterator(iterator)](#isiteratoriterator)
* [series(...iterables)](#seriesiterators)
* [evenly(...iterables)](#evenlyiterators)
* [reverse(iterable)](#reverseiterable)

#### value(value)

Creates iterator with specified `value`.

If value is not specified, returns empty iterator.

**Example:**

```js
const hoi = require('ho-iter');

const iter = hoi.value(123);

iter.next(); // { value: 123, done: false }
iter.next(); // { value: null, done: true }
```

#### isIterable(iterable)

Returns `true` if the specified object implements the Iterator protocol via implementing a `Symbol.iterator`.

**Example:**

```js
const isIterable = require('ho-iter').isIterable;

isIterable([1, 2, 3]); // true
isIterable(123); // false
```

#### isIterator(iterator)

Returns `true` if the specified object is iterator.

```js
const isIterator = require('ho-iter').isIterator;

const generator = function *() {};
const iterator = generator();

isIterator(generator) // false
isIterator(iterator) // true
```

#### series(...iterables)

Returns an Iterator, that traverses iterators in series.

This is reminiscent of the concatenation of arrays.

**Example:**

```js
const series = require('ho-iter').series;

const arr1 = [1, 2];
const arr2 = [3, 4];

const set1 = new Set([1, 2]);
const set2 = new Set([3, 4]);

[].concat(arr1, arr2);

// ➜ [1, 2, 3, 4]

for (let item of series(set1, set2)) {
    console.log(item);
}

// ➜ 1 2 3 4
```

#### evenly(...iterables)

Returns an Iterator, that traverses iterators evenly.

This is reminiscent of the traversing of several arrays.

**Example:**

```js
const evenly = require('ho-iter').evenly;

const arr1 = [1, 2];
const arr2 = [3, 4];

const set1 = new Set([1, 2]);
const set2 = new Set([3, 4]);

for (let i = 0; i < arr1.length; i++) {
    console.log(arr1[i]);
    console.log(arr2[i]);
}

// ➜ 1 3 2 4

for (let item of evenly(set1, set2)) {
    console.log(item);
}

// ➜ 1 3 2 4
```

### reverse(iterator)

Returns an reversed Iterator.

**Important:** incompatible with infinite iterator. Don't use infinite iterator, otherwise reverse method will fall into endless loop loop.

This is reminiscent of the reversing of an array.

**Example:**

```js
const reverse = require('ho-iter').reverse;

const arr = [1, 2, 3, 4];
const set = new Set([1, 2, 3, 4]);

for (let i = arr.length; i >= 0; i--) {
    console.log(arr[i]);
}

// ➜ 4 3 2 1

for (let item of reverse(set)) {
    console.log(item);
}

// ➜ 4 3 2 1
```

License
-------

MIT © [Andrew Abramov](https://github.com/blond)
