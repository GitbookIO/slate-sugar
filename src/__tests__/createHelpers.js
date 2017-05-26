import test from 'ava';
import createHelpers from '../createHelpers';
import createNode from '../createNode';
import blocks from './fixtures';

test('should create a heading', (t) => {
    const helpers = createHelpers(blocks.HEADING);
    const actual = helpers.heading();
    const expected = createNode(blocks.HEADING);

    t.deepEqual(actual, expected);
});

test('should create a paragraph', (t) => {
    const helpers = createHelpers(blocks.PARAGRAPH);
    const actual = helpers.paragraph();
    const expected = createNode(blocks.PARAGRAPH);

    t.deepEqual(actual, expected);
});

test('should create an inline link', (t) => {
    const helpers = createHelpers([blocks.LINK, { kind: 'inline' }]);
    const actual = helpers.link();
    const expected = createNode(blocks.LINK, { kind: 'inline' });

    t.deepEqual(actual, expected);
});

test('should create a set of helpers', (t) => {
    const helpers = createHelpers(blocks.HEADING, blocks.PARAGRAPH, [blocks.LINK, { kind: 'inline' }]);
    const actual = helpers.heading([
        helpers.paragraph([
            helpers.link()
        ])
    ]);
    const expected = createNode(blocks.HEADING, [
        createNode(blocks.PARAGRAPH, [
            createNode(blocks.LINK, { kind: 'inline' })
        ])
    ]);

    t.deepEqual(actual, expected);
});
