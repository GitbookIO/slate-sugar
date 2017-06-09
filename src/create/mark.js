/* @flow */

import createText from './text';
import type { Children, Node } from '../types';

function createMark(
    tagName: string,
    attributes: Object,
    children: Children
): Node {
    const marks = [
        {
            type: tagName,
            data: attributes
        }
    ];
    return createText(tagName, { marks }, children);
}

export default createMark;
