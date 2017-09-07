/* @flow */

import create from './unknown';
import type { Children, Node } from '../types';

function createDocument(
    tagName: string,
    { key, ...otherAttributes }: Object,
    children: Children
): Node {

    return create(tagName, {
        kind: 'document',
        key,
        data: otherAttributes
    }, children);
}

export default createDocument;
