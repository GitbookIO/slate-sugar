import create, { state, document, block, inline, text, mark } from './create';

function getTagName(name) {
    return name.toLowerCase().replace(/_/g, '-');
}

function createTagNameMappers(map, mapTagNameToProps) {
    return Object.keys(map).reduce((acc, name) => ({
        [getTagName(name)]: (tagName, attributes, children) => mapTagNameToProps(map[name], attributes, children),
        ...acc
    }), {});
}

const defaultGroups = {
    state,
    document,
    text
};

const defaultTagNameMappers = {
    blocks: block,
    inlines: inline,
    marks: mark
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
        if (attributes == null) {
            attributes = {};
        }

        children = children.map(child =>
            typeof child === 'object'
                ? child
                : text('text', {}, [child])
        );

        const mapTagNameToProps = mappers.hasOwnProperty(tagName)
            ? mappers[tagName]
            : create;

        return mapTagNameToProps(tagName, attributes, children);
    };
}

export default createHyperscript;
