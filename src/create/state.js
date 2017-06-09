import createUnknown from './unknown';

function createState(tagName, attributes, children) {
    return createUnknown(tagName, {
        kind: 'state',
        ...attributes
    }, children);
}

export default createState;
