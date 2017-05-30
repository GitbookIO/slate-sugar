import test from 'ava';
import createNode, { createShorthand, block, inline, range, document } from '../';

[createNode, createShorthand, block, inline, range, document].forEach((fn) => {
    test('should export a set of helpers', (t) => {
        const actual = typeof fn;
        const expected = 'function';

        t.is(actual, expected);
    });
});
