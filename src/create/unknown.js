/* @flow */

import { State, Document, Block, Inline, Text, Mark } from 'slate';
import createText from './text';
import type { Children, Node } from '../types';

function createTextNodes(children: Children): Node[] {
    return children.map(child =>
        typeof child === 'object'
            ? child
            : createText('text', {}, [child])
    );
}

function createUnknown(
    tagName: string,
    attributes: Object,
    children: Children
): Node {
    const { kind, key, ...otherAttributes } = attributes;

    switch (kind) {
    case 'state':
        return State.create({
            document: children[0]
        }, attributes);
    case 'document':
        return Document.create({
            nodes: createTextNodes(children),
            ...attributes
        });
    case 'block':
        return Block.create({
            type: tagName,
            key,
            nodes: createTextNodes(children),
            ...otherAttributes
        });
    case 'inline':
        return Inline.create({
            type: tagName,
            key,
            nodes: createTextNodes(children),
            ...otherAttributes
        });
    case 'text': {
        const {
            marks = Mark.createSet([])
        } = attributes;
        const text = Text.createFromString(children.join(''), marks);
        return text.set('key', key || text.key);
    }
    default:
        throw new Error(`Cannot create Node of unknown kind ${kind}`);
    }
}

export default createUnknown;
