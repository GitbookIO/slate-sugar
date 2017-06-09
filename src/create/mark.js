import createText from './text';

function createMark(tagName, attributes, children) {
    const marks = [
        {
            type: tagName,
            data: attributes
        }
    ];
    return createText(tagName, { marks }, children);
}

export default createMark;
