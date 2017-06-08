/** @jsx h */

import test from 'ava';
import { Raw, State, Document, Block, Text, Inline } from 'slate';
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

test.failing('should create a text node with marks and the provided text', (t) => {
    const actual = (
        <text marks={['bold']}>Super bold</text>
    ).text;
    const expected = 'Super bold';

    t.is(actual, expected);
});

test('should throw an error when trying to create a node with unknown kind', (t) => {
    t.throws(() => <test />);
});

test('should register default blocks', (t) => {
    h = createHyperscript({
        blocks: {
            paragraph: 'PARAGRAPH'
        }
    });
    const actual = <paragraph /> instanceof Block;
    const expected = true;

    t.is(actual, expected);
});

test('should set type accordingly', (t) => {
    h = createHyperscript({
        blocks: {
            paragraph: 'PARAGRAPH'
        }
    });
    const actual = (<paragraph />).type;
    const expected = 'PARAGRAPH';

    t.is(actual, expected);
});

test('should normalize the name', (t) => {
    h = createHyperscript({
        blocks: {
            HEADING_1: 'HEADING_1'
        }
    });
    const actual = (<heading-1 />).type;
    const expected = 'HEADING_1';

    t.is(actual, expected);
});

test('should not lose block\'s data', (t) => {
    h = createHyperscript({
        blocks: {
            paragraph: 'PARAGRAPH'
        }
    });
    const actual = (<paragraph foo="bar" />).data.get('foo');
    const expected = 'bar';

    t.is(actual, expected);
});

test('should register default inlines', (t) => {
    h = createHyperscript({
        inlines: {
            link: 'LINK'
        }
    });
    const actual = <link /> instanceof Inline;
    const expected = true;

    t.is(actual, expected);
});

test('should not lose inline\'s data', (t) => {
    h = createHyperscript({
        inlines: {
            link: 'LINK'
        }
    });
    const actual = (<link foo="bar" />).data.get('foo');
    const expected = 'bar';

    t.is(actual, expected);
});

test('should register default marks', (t) => {
    h = createHyperscript({
        marks: {
            bold: 'BOLD'
        }
    });
    const actual = (
        <bold>Super bold</bold>
    ).characters.every(
        character => character.marks.size === 1 && character.marks.every(
            mark => mark.get('type') === 'BOLD'
        )
    );
    const expected = true;

    t.is(actual, expected);
});

test('should add data to registered marks', (t) => {
    h = createHyperscript({
        marks: {
            bold: 'BOLD'
        }
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
        voids: {
            img: 'IMG'
        }
    }, {
        voids: (tagName, attributes) => ({
            type: tagName,
            data: attributes,
            kind: 'block',
            isVoid: true
        })
    });
    const actual = (<img />).isVoid;
    const expected = true;

    t.is(actual, expected);
});

test('should work with text surrounded by other nodes', (t) => {
    h = createHyperscript({
        inlines: {
            link: 'link'
        }
    });
    const actual = Raw.serializeDocument(
        <document>
            <link>Some <link>link</link> and text.</link>
        </document>
    , { terse: true });
    const expected = {
        nodes: [
            {
                kind: 'inline',
                type: 'link',
                nodes: [
                    {
                        kind: 'text',
                        text: 'Some '
                    },
                    {
                        kind: 'inline',
                        type: 'link',
                        nodes: [
                            {
                                kind: 'text',
                                text: 'link'
                            }
                        ]
                    },
                    {
                        kind: 'text',
                        text: ' and text.'
                    }
                ]
            }
        ]
    };

    t.deepEqual(actual, expected);
});

test('should create a state', (t) => {
    const actual = (
            <state>
                <document>
                    <paragraph kind="block">
                        Super paragraph.
                    </paragraph>
                </document>
            </state>
        ) instanceof State;
    const expected = true;

    t.is(actual, expected);
});

test('should normalize by default when creating a state', (t) => {
    const actual = Raw.serializeState(
        <state>
            <document>
                <section kind="block">
                    <link kind="inline">Super link.</link>
                </section>
            </document>
        </state>
    , { terse: true });
    const expected = {
        nodes: [
            {
                kind: 'block',
                type: 'section',
                nodes: [
                    {
                        kind: 'text',
                        text: ''
                    },
                    {
                        kind: 'inline',
                        type: 'link',
                        nodes: [
                            {
                                kind: 'text',
                                text: 'Super link.'
                            }
                        ]
                    },
                    {
                        kind: 'text',
                        text: ''
                    }
                ]
            }
        ]
    };

    t.deepEqual(actual, expected);
});

test('should not normalize state if disabled', (t) => {
    const actual = Raw.serializeState(
        <state normalize={false}>
            <document>
                <section kind="block">
                    <link kind="inline">Super link.</link>
                </section>
            </document>
        </state>
        , { terse: true });
    const expected = {
        nodes: [
            {
                kind: 'block',
                type: 'section',
                nodes: [
                    {
                        kind: 'inline',
                        type: 'link',
                        nodes: [
                            {
                                kind: 'text',
                                text: 'Super link.'
                            }
                        ]
                    }
                ]
            }
        ]
    };

    t.deepEqual(actual, expected);
});

test.failing('should work with attributes omitted', (t) => {
    h = createHyperscript({
        blocks: {
            heading: 'heading'
        }
    });
    const actual = h('heading', 'Super heading').text;
    const expected = 'Super heading';

    t.is(actual, expected);
});

test('should work with children omitted', (t) => {
    h = createHyperscript({
        blocks: {
            heading: 'heading'
        }
    });
    const actual = h('heading').type;
    const expected = 'heading';

    t.is(actual, expected);
});

test.failing('should work with custom mapper that returns a node', (t) => {
    let block;
    h = createHyperscript({
        code: () => {
            block = Block.create({ type: 'code' });
            return block;
        }
    });
    const actual = h('code');
    const expected = block;

    t.is(actual, expected);
});