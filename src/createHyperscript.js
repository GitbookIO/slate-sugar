/* @flow */

import create, {
    createState,
    createDocument,
    createBlock,
    createInline,
    createText,
    createMark
} from './create';
import type { Children, Node } from './types';

function getTagName(name: string): string {
    return name.toLowerCase().replace(/_/g, '-');
}

type NodeCreator = (tagName: string, attributes: Object, children: Children) => Node;

function createTagNameMappers(
    map: { [name: string]: string },
    createNode: NodeCreator
): { [tagName: string]: NodeCreator } {
    return Object
        .keys(map)
        .reduce((acc, name) => ({
            [getTagName(name)]: (tagName, attributes, children) => createNode(map[name], attributes, children),
            ...acc
        }), {});
}

function createHyperscript(
    groups: { [groupName: string]: { [name: string]: string } | NodeCreator } = {},
    creators: { [tagName: string]: NodeCreator } = {}
) {
    const defaultGroups = {
        state: createState,
        document: createDocument,
        text: createText
    };
    groups = {
        ...defaultGroups,
        ...groups
    };

    const defaultTagNameMappers = {
        blocks: createBlock,
        inlines: createInline,
        marks: createMark
    };
    creators = {
        ...defaultTagNameMappers,
        ...creators
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
                    creators[group]
                ),
                ...acc
            };
        }, {});

    return (tagName: string, attributes: Object, ...children: Children) => {
        if (attributes == null) {
            attributes = {};
        }

        const mapTagNameToProps = mappers.hasOwnProperty(tagName)
            ? mappers[tagName]
            : create;

        return mapTagNameToProps(tagName, attributes, children);
    };
}

export default createHyperscript;
