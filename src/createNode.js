import { Document, Block, Inline, Text, Mark } from 'slate';

function createText(text, marks) {
    text = String(text);
    marks = Mark.createSet(marks.map(type => ({ type })));
    return Text.createFromString(text, marks);
}

function toNodes(nodes) {
    return [].concat(nodes).map(node =>
        typeof node === 'object'
            ? node
            : createNode(null, { kind: 'text' }, node)
    );
}

function create(model, type, nodes, props) {
    nodes = toNodes(nodes);
    return model.create({
        type,
        nodes,
        ...props
    });
}

function createNode(type, props = {}, nodes = []) {
    const { kind, ...otherProps } = props;

    switch (kind) {
    case 'document':
        return create(Document, null, nodes, {});
    case 'text':
        return createText(nodes, otherProps.marks || []);
    case 'block':
        return create(Block, type, nodes, otherProps);
    case 'inline':
        return create(Inline, type, nodes, otherProps);
    default:
        throw new Error(`Can't create node from unknown kind "${kind}"`);
    }
}

export default createNode;
