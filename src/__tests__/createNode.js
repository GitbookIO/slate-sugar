import test from 'ava';
import createNode from '../createNode';

test('should return foo', (t) => {
    t.is(createNode(), 'foo');
});
