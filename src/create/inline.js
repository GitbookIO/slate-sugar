import createUnknown from './unknown';

function createInline(tagName, attributes, children) {
    return createUnknown(tagName, {
        kind: 'inline',
        data: attributes
    }, children);
}

export default createInline;
