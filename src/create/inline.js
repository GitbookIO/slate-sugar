/* @flow */

import create from './unknown';
import type { Children, Node } from '../types';

function createInline(
    tagName: string,
    attributes: Object,
    children: Children
): Node {
    const { key, ...data } = attributes;
    return create(tagName, {
        kind: 'inline',
        key,
        data
    }, children);
}

export default createInline;
