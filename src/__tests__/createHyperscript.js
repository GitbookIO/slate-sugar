/* @jsx h */

import test from 'ava';
import Slate, { Document, Block, Inline, Text } from 'slate';
import createHyperscript from '../createHyperscript';
import helpers from './helpers';

test('should return a function', (t) => {
    const actual = typeof createHyperscript();
    const expected = 'function';

    t.is(actual, expected);
});

test('should create a document', (t) => {
    const actual = createHyperscript()('document') instanceof Document;
    const expected = true;

    t.is(actual, expected);
});

test('should create a block', (t) => {
    const actual = createHyperscript({
        blocks: ['heading']
    })('heading') instanceof Block;
    const expected = true;

    t.is(actual, expected);
});

test('should create a heading block', (t) => {
    const actual = createHyperscript({
        blocks: ['heading']
    })('heading').type;
    const expected = 'heading';

    t.is(actual, expected);
});

test('should create a paragraph block', (t) => {
    const actual = createHyperscript({
        blocks: ['paragraph']
    })('paragraph').type;
    const expected = 'paragraph';

    t.is(actual, expected);
});

test('should create an inline node', (t) => {
    const actual = createHyperscript({
        inlines: ['link']
    })('link') instanceof Inline;
    const expected = true;

    t.is(actual, expected);
});

test('should create an inline link', (t) => {
    const actual = createHyperscript({
        inlines: ['link']
    })('link').type;
    const expected = 'link';

    t.is(actual, expected);
});

test('should throw an error when creating a node from unknown type', (t) => {
    t.throws(() => createHyperscript()('foo'));
});

test('should add data to the block', (t) => {
    const actual = createHyperscript({
        blocks: ['heading']
    })('heading', { foo: 'bar' }).data.get('foo');
    const expected = 'bar';

    t.is(actual, expected);
});

test('should add child nodes', (t) => {
    const h = createHyperscript({
        blocks: ['section', 'paragraph']
    });
    const paragraph = h('paragraph');
    const actual = h('section', null, paragraph).nodes.first();
    const expected = paragraph;

    t.is(actual, expected);
});

test('should create a text node', (t) => {
    const actual = createHyperscript({
        marks: ['bold']
    })('bold') instanceof Text;
    const expected = true;

    t.is(actual, expected);
});

test('should add marks to the text', (t) => {
    const actual = helpers.hasMark(createHyperscript({
        marks: ['bold']
    })('bold', null, 'super bold'), 'bold');
    const expected = true;

    t.is(actual, expected);
});

test('should create a document from jsx', (t) => {
    /* eslint-disable no-unused-vars, react/react-in-jsx-scope */
    const h = createHyperscript({
        blocks: [
            'heading',
            'paragraph'
        ],
        inlines: [
            'link'
        ],
        marks: [
            'bold'
        ]
    });
    const actual = Slate.Raw.serializeDocument((
        <document>
            <heading>Super title</heading>
            <paragraph>With a paragraph of text, a <link href="/home">link</link> and some <bold foo="bar">bold content</bold>.</paragraph>
        </document>
    ), { terse: true });
    const expected = {
        nodes: [
            {
                kind: 'block',
                type: 'heading',
                nodes: [
                    {
                        kind: 'text',
                        text: 'Super title'
                    }
                ]
            },
            {
                kind: 'block',
                type: 'paragraph',
                nodes: [
                    {
                        kind: 'text',
                        text: 'With a paragraph of text, a '
                    },
                    {
                        kind: 'inline',
                        type: 'link',
                        data: { href: '/home' },
                        nodes: [
                            {
                                kind: 'text',
                                text: 'link'
                            }
                        ]
                    },
                    {
                        kind: 'text',
                        text: ' and some '
                    },
                    {
                        kind: 'text',
                        ranges: [
                            {
                                text: 'bold content',
                                marks: [
                                    {
                                        type: 'bold',
                                        data: {
                                            foo: 'bar'
                                        }
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        kind: 'text',
                        text: '.'
                    }
                ]
            }
        ]
    };

    t.deepEqual(actual, expected);
});
