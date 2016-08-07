'use strict';

const test = require('ava');

const createIterator = require('../../lib/create-iterator');

test('should throw error if value is number', t => {
    const number = 123;

    t.throws(() => createIterator(number));
});

test('should throw error if value is number object', t => {
    const number = new Number(123);

    t.throws(() => createIterator(number));
});

test('should throw error if value is zero number', t => {
    const number = 0;

    t.throws(() => createIterator(number));
});

test('should throw error if value is Infinity', t => {
    const number = Infinity;

    t.throws(() => createIterator(number));
});

test('should throw error if value is NaN', t => {
    const number = NaN;

    t.throws(() => createIterator(number));
});
