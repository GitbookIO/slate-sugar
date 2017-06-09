/* @flow */

import create from './unknown';
import type { Children, Node } from '../types';

function createInline(
    tagName: string,
    attributes: Object,
    children: Children
): Node {
    return create(tagName, {
        kind: 'inline',
        data: attributes
    }, children);
}

export default createInline;
