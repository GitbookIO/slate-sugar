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

export function defaultTransformer(tagName, attributes) {
    return {
        type: tagName,
        ...attributes
    };
}

export function blockTransformer(tagName, attributes) {
    return {
        type: tagName,
        data: attributes,
        kind: 'block'
    };
}

export function inlineTransformer(tagName, attributes) {
    return {
        type: tagName,
        data: attributes,
        kind: 'inline'
    };
}

export function markTransformer(tagName, attributes) {
    return {
        kind: 'text',
        marks: [
            {
                type: tagName,
                data: attributes
            }
        ]
    };
}

export function stateTransformer(tagName, attributes) {
    return {
        kind: 'state',
        ...attributes
    };
}

export function documentTransformer(tagName, attributes) {
    return {
        kind: 'document',
        data: attributes
    };
}

export function textTransformer(tagName, attributes) {
    return {
        kind: 'text',
        ...attributes
    };
}

function normalizeName(name) {
    return name.toLowerCase().replace(/_/g, '-');
}

function createTransformers(map, transformer) {
    return Object.keys(map).reduce((acc, name) => ({
        [normalizeName(name)]: (tagName, attributes) => transformer(map[name], attributes),
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

    return (tagName, attributes, ...children) => {
        children = children.map(child =>
            typeof child === 'object'
                ? child
                : createNode(null, { kind: 'text' }, [child])
        );

        const transformer = transformers.hasOwnProperty(tagName)
            ? transformers[tagName]
            : defaultTransformer;
        const {
            type: newType,
            ...newProps
        } = transformer(tagName, attributes);

        return createNode(newType, newProps, children);
    };
}

export default createHyperscript;
