function createTextNode(text) {
    return {
        kind: 'text',
        text
    };
}

function createNode(type, props = {}, children = []) {
    if (isChildren(props)) {
        children = props;
        props = {};
    }

    const { kind = 'block', ...rest } = props;
    children = children.map(node =>
        typeof node === 'object'
            ? node
            : createTextNode(node)
    );

    return {
        type,
        kind,
        nodes: children,
        ...rest
    };
}

function isChildren(children) {
    return (
           typeof children === 'string'
        || typeof children === 'number'
        || Array.isArray(children)
    );
}

export default createNode;
