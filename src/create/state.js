/* @flow */

import createUnknown from './unknown';
import type { Children, Node } from '../types';

function createState(
    tagName: string,
    attributes: Object,
    children: Children
): Node {
    return createUnknown(tagName, {
        kind: 'state',
        ...attributes
    }, children);
}

export default createState;
