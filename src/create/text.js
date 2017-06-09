/* @flow */

import { Mark } from 'slate';
import create from './unknown';
import type { Children, Node } from '../types';

function createText(
    tagName: string,
    { marks = [] }: { marks?: { type: string, data: Object }[] },
    children: Children
): Node {
    marks = Mark.createSet(marks.map(mark =>
        typeof mark === 'string'
            ? ({ type: mark })
            : mark
    ));
    return create(tagName, {
        kind: 'text',
        marks
    }, children);
}

export default createText;
