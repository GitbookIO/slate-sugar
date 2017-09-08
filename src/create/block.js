/* @flow */

import create from './unknown';
import type { Children, Node } from '../types';

function createBlock(
    tagName: string,
    attributes: Object,
    children: Children
): Node {
    const { key, ...data } = attributes;

    return create(tagName, {
        kind: 'block',
        key,
        data
    }, children);
}

export default createBlock;
