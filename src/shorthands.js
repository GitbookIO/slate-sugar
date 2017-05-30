import createNode from './createNode';

function isChildren(nodes) {
    return (
        Array.isArray(nodes)
        || typeof nodes === 'number'
        || typeof nodes === 'string'
    );
}

function createShorthand(kind) {
    return type => (data, nodes) => {
        if (nodes == null && isChildren(data)) {
            nodes = data;
            data = null;
        }

        return createNode(type, {
            kind,
            data
        }, nodes);
    };
}

export const block = createShorthand('block');
export const inline = createShorthand('inline');
export const range = createShorthand('text');
export const document = nodes => createNode(null, { kind: 'document' }, nodes);

export default createShorthand;
