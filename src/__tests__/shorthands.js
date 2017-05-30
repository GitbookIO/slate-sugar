import test from 'ava';
import { Block, Inline, Text, Document } from 'slate';
import { block, inline, range, document } from '../shorthands';

test('should return a function', (t) => {
    const actual = typeof block('heading');
    const expected = 'function';

    t.is(actual, expected);
});

test('should create a block', (t) => {
    const actual = block('heading')() instanceof Block;
    const expected = true;

    t.is(actual, expected);
});

test('should create a heading block', (t) => {
    const actual = block('heading')().type;
    const expected = 'heading';

    t.is(actual, expected);
});

test('should create a paragraph block', (t) => {
    const actual = block('paragraph')().type;
    const expected = 'paragraph';

    t.is(actual, expected);
});

test('should add data to the block', (t) => {
    const actual = block('paragraph')({ foo: 'bar' }).data.get('foo');
    const expected = 'bar';

    t.is(actual, expected);
});

test('should add some other data to the block', (t) => {
    const actual = block('paragraph')({ baz: 'quz' }).data.get('baz');
    const expected = 'quz';

    t.is(actual, expected);
});

test('should a child block', (t) => {
    const heading = block('heading')();
    const actual = block('section')({}, [heading]).nodes.first();
    const expected = heading;

    t.is(actual, expected);
});

test('should use second argument as nodes when data is omitted', (t) => {
    const heading = block('heading')();
    const actual = block('section')([heading]).nodes.first();
    const expected = heading;

    t.is(actual, expected);
});

test('should create an inline node', (t) => {
    const actual = inline('link')() instanceof Inline;
    const expected = true;

    t.is(actual, expected);
});

test('should create a text node', (t) => {
    const actual = range('bold')() instanceof Text;
    const expected = true;

    t.is(actual, expected);
});

test('should create a text node with provided content', (t) => {
    const actual = range('bold')('super bold').text;
    const expected = 'super bold';

    t.is(actual, expected);
});

test('should add marks to the range', (t) => {
    const actual = range('bold')('super bold')
        .characters
        .every(character =>
            character.marks.every(mark => mark.get('type') === 'bold')
        );
    const expected = true;

    t.is(actual, expected);
});

test('should create a document', (t) => {
    const actual = document() instanceof Document;
    const expected = true;

    t.is(actual, expected);
});

test('should create a document with a heading', (t) => {
    const heading = block('heading')('super heading');
    const actual = document([heading]).nodes.first();
    const expected = heading;

    t.is(actual, expected);
});
