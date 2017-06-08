import { State, Document, Block, Text, Inline, Mark } from 'slate';

function createNode(props, children) {
    const { type, kind } = props;

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

export function mapUnknownToProps(tagName, attributes) {
    return {
        type: tagName,
        ...attributes
    };
}

export function mapBlockToProps(tagName, attributes) {
    return {
        type: tagName,
        data: attributes,
        kind: 'block'
    };
}

export function mapInlineToProps(tagName, attributes) {
    return {
        type: tagName,
        data: attributes,
        kind: 'inline'
    };
}

export function mapMarkToProps(tagName, attributes) {
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

export function mapStateToProps(tagName, attributes) {
    return {
        kind: 'state',
        ...attributes
    };
}

export function mapDocumentToProps(tagName, attributes) {
    return {
        kind: 'document',
        data: attributes
    };
}

export function mapTextToProps(tagName, attributes) {
    return {
        kind: 'text',
        ...attributes
    };
}

function getTagName(name) {
    return name.toLowerCase().replace(/_/g, '-');
}

function createTagNameMappers(map, mapTagNameToProps) {
    return Object.keys(map).reduce((acc, name) => ({
        [getTagName(name)]: (tagName, attributes) => mapTagNameToProps(map[name], attributes),
        ...acc
    }), {});
}

const defaultGroups = {
    state: mapStateToProps,
    document: mapDocumentToProps,
    text: mapTextToProps
};

const defaultTagNameMappers = {
    blocks: mapBlockToProps,
    inlines: mapInlineToProps,
    marks: mapMarkToProps
};

function createHyperscript(
    groups = {},
    tagNameMappers = {}
) {
    groups = {
        ...defaultGroups,
        ...groups
    };
    tagNameMappers = {
        ...defaultTagNameMappers,
        ...tagNameMappers
    };
    const mappers = Object
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
                ...createTagNameMappers(
                    map,
                    tagNameMappers[group]
                ),
                ...acc
            };
        }, {});

    return (tagName, attributes, ...children) => {
        children = children.map(child =>
            typeof child === 'object'
                ? child
                : createNode({ kind: 'text' }, [child])
        );

        const mapTagNameToProps = mappers.hasOwnProperty(tagName)
            ? mappers[tagName]
            : mapUnknownToProps;
        const props = mapTagNameToProps(tagName, attributes);

        return createNode(props, children);
    };
}

export default createHyperscript;
