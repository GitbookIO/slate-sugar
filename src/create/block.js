/* @flow */

import createUnknown from './unknown';
import type { Children, Node } from '../types';

function createBlock(
    tagName: string,
    attributes: Object,
    children: Children
): Node {
    return createUnknown(tagName, {
        kind: 'block',
        data: attributes
    }, children);
}

export default createBlock;
