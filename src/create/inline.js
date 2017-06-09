/* @flow */

import createUnknown from './unknown';
import type { Children, Node } from '../types';

function createInline(
    tagName: string,
    attributes: Object,
    children: Children
): Node {
    return createUnknown(tagName, {
        kind: 'inline',
        data: attributes
    }, children);
}

export default createInline;
