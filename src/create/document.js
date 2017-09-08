/* @flow */

import create from './unknown';
import type { Children, Node } from '../types';

function createDocument(
    tagName: string,
    { key, ...data }: Object,
    children: Children
): Node {

    return create(tagName, {
        kind: 'document',
        key,
        data
    }, children);
}

export default createDocument;
