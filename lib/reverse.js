'use strict';
/**
 * Returns an reversed Iterator.
 *
 * @param {iterator} iterator iterator fo reversing
 * @returns {Iterator}
 */
function reverse(iterator) {
    const arrayFromIterator = iterator ? Array.from(iterator) : [];
    let count = arrayFromIterator.length;

    return function* () {
        while(count){
            count--;
            const iter = arrayFromIterator[count];
            yield iter;
        }
    }();
}

module.exports = reverse;
