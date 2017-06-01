import test from 'ava';
import createHyperscript from '../';

[createHyperscript].forEach((fn) => {
    test('should export a set of helpers', (t) => {
        const actual = typeof fn;
        const expected = 'function';

        t.is(actual, expected);
    });
});
