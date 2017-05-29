import test from 'ava';
import node from '../';

test('should create a block', (t) => {
    const actual = node();
    const expected = 'foo';

    t.is(actual, expected);
});
