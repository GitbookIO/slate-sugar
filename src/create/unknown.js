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
    { kind, ...attributes }: Object,
    children: Children
): Node {
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
            nodes: createTextNodes(children),
            ...attributes
        });
    case 'inline':
        return Inline.create({
            type: tagName,
            nodes: createTextNodes(children),
            ...attributes
        });
    case 'text': {
        const {
            marks = Mark.createSet([])
        } = attributes;
        return Text.createFromString(children.join(''), marks);
    }
    default:
        throw new Error(`Cannot create Node of unknown kind ${kind}`);
    }
}

export default createUnknown;
