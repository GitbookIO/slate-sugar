/* @flow */

import createUnknown from './unknown';
import type { Children, Node } from '../types';

function createDocument(
    tagName: string,
    attributes: Object,
    children: Children
): Node {
    return createUnknown(tagName, {
        kind: 'document',
        data: attributes
    }, children);
}

export default createDocument;
