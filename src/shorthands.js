import createNode from './createNode';

function isChildren(nodes) {
    return (
        Array.isArray(nodes)
        || typeof nodes === 'number'
        || typeof nodes === 'string'
    );
}

function createShorthand(kind, mergeProps = props => ({ data: props })) {
    return type => (props, nodes) => {
        if (nodes == null && isChildren(props)) {
            nodes = props;
            props = null;
        }

        return createNode(type, {
            kind,
            ...mergeProps(props, type, kind)
        }, nodes);
    };
}

export const block = createShorthand('block');
export const inline = createShorthand('inline');
export const range = createShorthand('text', (props, type) => ({ marks: [type] }));
export const document = createShorthand('document')();

export default createShorthand;
