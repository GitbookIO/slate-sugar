/* @jsx h */
/* eslint-disable react/react-in-jsx-scope, no-unused-vars */

import test from 'ava';
import { Document, Block, Text, Inline } from 'slate';
import createHyperscript from '../';

let h;
test.beforeEach(() => {
    h = createHyperscript();
});

test('should create a document', (t) => {
    const actual = <document /> instanceof Document;
    const expected = true;

    t.is(actual, expected);
});

test('should create a block', (t) => {
    const actual = <paragraph kind="block" /> instanceof Block;
    const expected = true;

    t.is(actual, expected);
});

test('should create a block with the provided type', (t) => {
    const actual = (<paragraph kind="block" />).type;
    const expected = 'paragraph';

    t.is(actual, expected);
});

test('should create a block with a different type', (t) => {
    const actual = (<heading kind="block" />).type;
    const expected = 'heading';

    t.is(actual, expected);
});

test('should create a block with some data', (t) => {
    const actual = (<heading kind="block" data={{ foo: 'bar' }} />).data.get('foo');
    const expected = 'bar';

    t.is(actual, expected);
});

test('should create a block with a child', (t) => {
    const child = <paragraph kind="block" />;
    const actual = (<section kind="block">{child}</section>).nodes.get(0);
    const expected = child;

    t.is(actual, expected);
});

test('should create a block with a text child', (t) => {
    const actual = (<paragraph kind="block">Super text!</paragraph>).nodes.get(0) instanceof Text;
    const expected = true;

    t.is(actual, expected);
});

test('should contain the provided text', (t) => {
    const actual = (<paragraph kind="block">Super text!</paragraph>).nodes.get(0).text;
    const expected = 'Super text!';

    t.is(actual, expected);
});

test('should create text node from numeric value', (t) => {
    const actual = (<paragraph kind="block">123</paragraph>).nodes.get(0).text;
    const expected = '123';

    t.is(actual, expected);
});

test('should add nodes to the document', (t) => {
    const actual = (
        <document>
            <heading kind="block">Awesome heading!</heading>
            <paragraph kind="block">Super text!</paragraph>
        </document>
    ).nodes.size;
    const expected = 2;

    t.is(actual, expected);
});

test('should create a document with a text node', (t) => {
    const actual = (
        <document>
            So lonely
        </document>
    ).nodes.get(0).text;
    const expected = 'So lonely';

    t.is(actual, expected);
});

test('should create an inline', (t) => {
    const actual = <link kind="inline" /> instanceof Inline;
    const expected = true;

    t.is(actual, expected);
});

test('should create an inline with provided type', (t) => {
    const actual = (<link kind="inline" />).type;
    const expected = 'link';

    t.is(actual, expected);
});

test('should create an inline with a different type', (t) => {
    const actual = (<bold kind="inline" />).type;
    const expected = 'bold';

    t.is(actual, expected);
});

test('should create an inline with some data', (t) => {
    const actual = (<link kind="inline" data={{ href: '/' }} />).data.get('href');
    const expected = '/';

    t.is(actual, expected);
});

test('should create an inline with a child', (t) => {
    const actual = (<bold kind="inline">Super bold</bold>).nodes.get(0).text;
    const expected = 'Super bold';

    t.is(actual, expected);
});

test('should create a text node', (t) => {
    const actual = <text /> instanceof Text;
    const expected = true;

    t.is(actual, expected);
});

test('should create a text node with marks', (t) => {
    const actual = (
        <text marks={['bold']}>Super bold</text>
    ).characters.every(
        character => character.marks.size === 1 && character.marks.every(
            mark => mark.get('type') === 'bold'
        )
    );
    const expected = true;

    t.is(actual, expected);
});

test('should create a text node with more complex marks', (t) => {
    const actual = (
        <text
            marks={[
                {
                    type: 'bold',
                    data: { foo: 'bar' }
                }
            ]}
        >
            Super bold
        </text>
    ).characters.every(
        character => character.marks.size === 1 && character.marks.every(
            mark => mark.get('type') === 'bold' && mark.data.get('foo') === 'bar'
        )
    );
    const expected = true;

    t.is(actual, expected);
});

test('should throw an error when trying to create a node with unknown kind', (t) => {
    t.throws(() => <test />);
});

test('should register default blocks', (t) => {
    h = createHyperscript({
        blocks: [
            'paragraph'
        ]
    });
    const actual = <paragraph /> instanceof Block;
    const expected = true;

    t.is(actual, expected);
});

test('should not lose block\'s data', (t) => {
    h = createHyperscript({
        blocks: [
            'paragraph'
        ]
    });
    const actual = (<paragraph foo="bar" />).data.get('foo');
    const expected = 'bar';

    t.is(actual, expected);
});

test('should register default inlines', (t) => {
    h = createHyperscript({
        inlines: [
            'link'
        ]
    });
    const actual = <link /> instanceof Inline;
    const expected = true;

    t.is(actual, expected);
});

test('should not lose inline\'s data', (t) => {
    h = createHyperscript({
        inlines: [
            'link'
        ]
    });
    const actual = (<link foo="bar" />).data.get('foo');
    const expected = 'bar';

    t.is(actual, expected);
});

test('should register default marks', (t) => {
    h = createHyperscript({
        marks: [
            'bold'
        ]
    });
    const actual = (
        <bold>Super bold</bold>
    ).characters.every(
        character => character.marks.size === 1 && character.marks.every(
            mark => mark.get('type') === 'bold'
        )
    );
    const expected = true;

    t.is(actual, expected);
});

test('should add data to registered marks', (t) => {
    h = createHyperscript({
        marks: [
            'bold'
        ]
    });
    const actual = (
        <bold foo="bar">Super bold</bold>
    ).characters.every(
        character => character.marks.size === 1 && character.marks.every(
            mark => mark.data.get('foo') === 'bar'
        )
    );
    const expected = true;

    t.is(actual, expected);
});

test('should rename document', (t) => {
    h = createHyperscript({
        doc: () => ({ kind: 'document' })
    });
    const actual = <doc /> instanceof Document;
    const expected = true;

    t.is(actual, expected);
});

test('should register a transformer for a group', (t) => {
    h = createHyperscript({
        voids: [
            'img'
        ]
    }, {
        voids: ({ type, ...data }) => ({
            type,
            data,
            kind: 'block',
            isVoid: true
        })
    });
    const actual = (<img />).isVoid;
    const expected = true;

    t.is(actual, expected);
});
