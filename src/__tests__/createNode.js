import test from 'ava';
import { Document, Block, Inline, Text } from 'slate';
import createNode from '../createNode';

test('should create a block node', (t) => {
    const actual = createNode('heading', { kind: 'block' }) instanceof Block;
    const expected = true;

    t.is(actual, expected);
});

test('should create a block of type heading', (t) => {
    const actual = createNode('heading', { kind: 'block' }).type;
    const expected = 'heading';

    t.is(actual, expected);
});

test('should create a block of type paragraph', (t) => {
    const actual = createNode('paragraph', { kind: 'block' }).type;
    const expected = 'paragraph';

    t.is(actual, expected);
});

test('should add data to the block', (t) => {
    const actual = createNode('paragraph', {
        kind: 'block',
        data: {
            foo: 'bar'
        }
    }).data.get('foo');
    const expected = 'bar';

    t.is(actual, expected);
});

test('should create an inline node', (t) => {
    const actual = createNode('link', { kind: 'inline' }) instanceof Inline;
    const expected = true;

    t.is(actual, expected);
});

test('should create a document', (t) => {
    const actual = createNode(null, { kind: 'document' }) instanceof Document;
    const expected = true;

    t.is(actual, expected);
});

test('should throw an error when trying to create a node of an unknown kind', (t) => {
    t.throws(() => createNode('heading', { kind: 'wut' }));
});

test('should create a text node', (t) => {
    const actual = createNode(null, { kind: 'text' }, '') instanceof Text;
    const expected = true;

    t.is(actual, expected);
});

test('should create a text node with text in it', (t) => {
    const actual = createNode(null, { kind: 'text' }, 'foo').text;
    const expected = 'foo';

    t.is(actual, expected);
});

test('should create a text node from a numeric value', (t) => {
    const actual = createNode(null, { kind: 'text' }, 2).text;
    const expected = '2';

    t.is(actual, expected);
});

test('should create a paragraph with an inline child', (t) => {
    const link = createNode('link', { kind: 'inline' });
    const actual = createNode('heading', { kind: 'block' }, [link]).nodes.get(0);
    const expected = link;

    t.is(actual, expected);
});

test('should create a link with a text child', (t) => {
    const text = createNode(null, { kind: 'text' }, 'super text');
    const actual = createNode('link', { kind: 'inline' }, [text]).nodes.get(0);
    const expected = text;

    t.is(actual, expected);
});

test('should create a text node from plain string within an inline node', (t) => {
    const actual = createNode('link', { kind: 'inline' }, 'super text').text;
    const expected = 'super text';

    t.is(actual, expected);
});

test('should create a text node from plain string within a block node', (t) => {
    const actual = createNode('paragraph', { kind: 'block' }, 'super text').text;
    const expected = 'super text';

    t.is(actual, expected);
});

test('should add marks to a range of text', (t) => {
    const actual = createNode(null, { kind: 'text', marks: ['bold'] }, 'super bold')
        .characters
        .every(character =>
            character.marks.every(mark => mark.type === 'bold')
        );
    const expected = true;

    t.is(actual, expected);
});
