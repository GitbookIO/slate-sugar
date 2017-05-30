import test from 'ava';
import createNode, { createShorthand, block, inline, range } from '../';

[createNode, createShorthand, block, inline, range].forEach((fn) => {
    test('should export a set of helpers', (t) => {
        const actual = typeof fn;
        const expected = 'function';

        t.is(actual, expected);
    });
});
