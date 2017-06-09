/* @flow */

import create from './unknown';
import type { Children, Node } from '../types';

function createBlock(
    tagName: string,
    attributes: Object,
    children: Children
): Node {
    return create(tagName, {
        kind: 'block',
        data: attributes
    }, children);
}

export default createBlock;
