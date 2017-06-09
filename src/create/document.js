import createUnknown from './unknown';

function createDocument(tagName, attributes, children) {
    return createUnknown(tagName, {
        kind: 'document',
        data: attributes
    }, children);
}

export default createDocument;
