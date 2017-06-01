import { Document, Block, Text, Inline, Mark } from 'slate';

function createNode(type, props, children) {
    if (type === 'text') {
        const marks = (props && props.marks) || [];
        return Text.createFromString(
            String(children.join('')),
            Mark.createSet(marks.map(mark =>
                typeof mark === 'string'
                    ? ({ type: mark })
                    : mark
            ))
        );
    }

    if (type === 'document') {
        return Document.create({
            nodes: children
        });
    }

    const { kind } = props;
    if (kind === 'inline') {
        return Inline.create({
            type,
            nodes: children,
            ...props
        });
    }

    if (kind === 'block') {
        return Block.create({
            type,
            nodes: children,
            ...props
        });
    }

    throw new Error(`Cannot create Node of unknown kind ${kind}`);
}

function defaultTransformer(props) {
    return props;
}

function blockTransformer({ type, ...data }) {
    return {
        type,
        data,
        kind: 'block'
    };
}

function inlineTransformer({ type, ...data }) {
    return {
        type,
        data,
        kind: 'inline'
    };
}

function markTransformer({ type, ...data }) {
    return {
        type: 'text',
        marks: [
            {
                type,
                data
            }
        ]
    };
}

function documentTransformer({ type, ...data }) {
    return {
        type: 'document',
        data
    };
}

function createTransformers(types, transformer) {
    return types.reduce((acc, type) => ({
        [type]: transformer,
        ...acc
    }), {});
}

function createHyperscript(
    {
        blocks = [],
        inlines = [],
        marks = [],
        ...customTransformers
    } = {}
) {
    const transformers = {
        document: documentTransformer,
        ...createTransformers(blocks, blockTransformer),
        ...createTransformers(inlines, inlineTransformer),
        ...createTransformers(marks, markTransformer),
        ...customTransformers
    };

    return (type, props, ...children) => {
        children = children.map(child =>
            typeof child === 'object'
                ? child
                : createNode('text', null, children)
        );

        const transformer = transformers.hasOwnProperty(type)
            ? transformers[type]
            : defaultTransformer;
        const {
            type: newType,
            ...newProps
        } = transformer({ type, ...props });

        return createNode(newType, newProps, children);
    };
}

export default createHyperscript;
