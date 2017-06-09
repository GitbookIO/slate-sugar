import createUnknown from './unknown';

function createBlock(tagName, attributes, children) {
    return createUnknown(tagName, {
        kind: 'block',
        data: attributes
    }, children);
}

export default createBlock;
