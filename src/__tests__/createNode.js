import test from 'ava';
import createNode from '../createNode';
import blocks from './fixtures';

test('should create a block', (t) => {
    const actual = createNode(blocks.HEADING).kind;
    const expected = 'block';

    t.is(actual, expected);
});

test('should keep a reference to the type', (t) => {
    const actual = createNode(blocks.HEADING).type;
    const expected = blocks.HEADING;

    t.is(actual, expected);
});

test('should keep reference to another type', (t) => {
    const actual = createNode(blocks.PARAGRAPH).type;
    const expected = blocks.PARAGRAPH;

    t.is(actual, expected);
});

test('should create an inline node', (t) => {
    const actual = createNode(blocks.LINK, { kind: 'inline' }).kind;
    const expected = 'inline';

    t.is(actual, expected);
});

test('should attach a data object', (t) => {
    const actual = createNode(blocks.LINK, {
        kind: 'inline',
        data: {
            href: '/home'
        }
    }).data;
    const expected = {
        href: '/home'
    };

    t.deepEqual(actual, expected);
});

test('should have no child nodes by default', (t) => {
    const actual = createNode(blocks.HEADING).nodes;
    const expected = [];

    t.deepEqual(actual, expected);
});

test('should have one child', (t) => {
    const link = createNode(blocks.LINK);
    const actual = createNode(blocks.HEADING, [
        link
    ]).nodes.length;
    const expected = 1;

    t.is(actual, expected);
});

test('should have a link child', (t) => {
    const link = createNode(blocks.LINK);
    const actual = createNode(blocks.HEADING, [
        link
    ]).nodes[0];
    const expected = link;

    t.is(actual, expected);
});

test('should have a paragraph child', (t) => {
    const paragraph = createNode(blocks.PARAGRAPH);
    const actual = createNode(blocks.DIV, [
        paragraph
    ]).nodes[0];
    const expected = paragraph;

    t.is(actual, expected);
});

test('should accept text nodes', (t) => {
    const actual = createNode(blocks.PARAGRAPH, [
        'foo'
    ]).nodes[0];
    const expected = {
        kind: 'text',
        text: 'foo'
    };

    t.deepEqual(actual, expected);
});

test('should accept numeric text nodes', (t) => {
    const actual = createNode(blocks.PARAGRAPH, [
        1
    ]).nodes[0];
    const expected = {
        kind: 'text',
        text: 1
    };

    t.deepEqual(actual, expected);
});
