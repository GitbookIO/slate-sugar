import { Mark } from 'slate';
import createUnknown from './unknown';

function createText(tagName, { marks = [] }, children) {
    marks = Mark.createSet(marks.map(mark =>
        typeof mark === 'string'
            ? ({ type: mark })
            : mark
    ));
    return createUnknown(tagName, {
        kind: 'text',
        marks
    }, children);
}

export default createText;
