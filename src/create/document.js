/* @flow */

import create from './unknown';
import type { Children, Node } from '../types';

function createDocument(
    tagName: string,
    attributes: Object,
    children: Children
): Node {
    return create(tagName, {
        kind: 'document',
        data: attributes
    }, children);
}

export default createDocument;
