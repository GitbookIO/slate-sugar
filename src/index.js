import { State, Document, Block, Text, Inline, Mark } from 'slate';

function createNode(type, props, children) {
    const { kind } = props;

    switch (kind) {
    case 'state':
        return State.create({
            document: children[0]
        }, props);
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

export function defaultTransformer(props) {
    return props;
}

export function blockTransformer({ type, ...data }) {
    return {
        type,
        data,
        kind: 'block'
    };
}

export function inlineTransformer({ type, ...data }) {
    return {
        type,
        data,
        kind: 'inline'
    };
}

export function markTransformer({ type, ...data }) {
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

export function stateTransformer({ type, ...props }) {
    return {
        kind: 'state',
        ...props
    };
}

export function documentTransformer({ type, ...data }) {
    return {
        kind: 'document',
        data
    };
}

export function textTransformer({ type, ...props }) {
    return {
        kind: 'text',
        ...props
    };
}

function normalizeName(name) {
    return name.toLowerCase().replace(/_/g, '-');
}

function createTransformers(map, transformer) {
    return Object.keys(map).reduce((acc, name) => ({
        [normalizeName(name)]: ({ type, ...props }) => transformer({
            type: map[name],
            ...props
        }),
        ...acc
    }), {});
}

function createHyperscript(
    groups = {},
    groupsTransformer = {}
) {
    groups = {
        state: stateTransformer,
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
            if (typeof groups[group] === 'function') {
                return {
                    [group]: groups[group],
                    ...acc
                };
            }

            const map = groups[group];
            return {
                ...createTransformers(
                    map,
                    groupsTransformer[group]
                ),
                ...acc
            };
        }, {});

    return (type, props, ...children) => {
        children = children.map(child =>
            typeof child === 'object'
                ? child
                : createNode(null, { kind: 'text' }, [child])
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
