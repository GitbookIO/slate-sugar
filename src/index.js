import { Document, Block, Text, Inline, Mark } from 'slate';

function createNode(type, props, children) {
    const { kind } = props;

    switch (kind) {
    case 'document':
        return Document.create({
            nodes: children
        });
    case 'text': {
        const text = String(children.join(''));
        const marks = Mark.createSet((props.marks || []).map(mark =>
            typeof mark === 'string'
                ? ({ type: mark })
                : mark
        ));
        return Text.createFromString(text, marks);
    }
    case 'inline':
        return Inline.create({
            type,
            nodes: children,
            ...props
        });
    case 'block':
        return Block.create({
            type,
            nodes: children,
            ...props
        });
    default:
        throw new Error(`Cannot create Node of unknown kind ${kind}`);
    }
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
        kind: 'text',
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
        kind: 'document',
        data
    };
}

function textTransformer({ type, ...props }) {
    return {
        kind: 'text',
        ...props
    };
}

function createTransformers(types, transformer) {
    return types.reduce((acc, type) => ({
        [type]: transformer,
        ...acc
    }), {});
}

function createHyperscript(
    groups = {},
    groupsTransformer = {}
) {
    groups = {
        document: documentTransformer,
        text: textTransformer,
        ...groups
    };
    groupsTransformer = {
        blocks: blockTransformer,
        inlines: inlineTransformer,
        marks: markTransformer,
        ...groupsTransformer
    };
    const transformers = Object
        .keys(groups)
        .reduce((acc, group) => {
            if (Array.isArray(groups[group])) {
                return {
                    ...createTransformers(
                        groups[group],
                        groupsTransformer[group]
                    ),
                    ...acc
                };
            }

            return {
                [group]: groups[group],
                ...acc
            };
        }, {});

    return (type, props, ...children) => {
        children = children.map(child =>
            typeof child === 'object'
                ? child
                : createNode(null, { kind: 'text' }, children)
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
