/* @flow */

import create from './unknown';
import type { Children, Node } from '../types';

function createState(
    tagName: string,
    attributes: Object,
    children: Children
): Node {
    return create(tagName, {
        kind: 'state',
        ...attributes
    }, children);
}

export default createState;
