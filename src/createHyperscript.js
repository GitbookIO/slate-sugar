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

function addNodeCreators(
    typeMap: { [name: string]: string },
    createNode: NodeCreator,
    initialValue: Object
): { [tagName: string]: NodeCreator } {
    return Object
        .keys(typeMap)
        .reduce((acc, key) => {
            const tagName = getTagName(key);
            const type = typeMap[key];
            return {
                [tagName]: (_, ...args) => createNode(type, ...args),
                ...acc
            };
        }, initialValue);
}

function createHyperscript(
    groups: { [groupName: string]: { [name: string]: string } | NodeCreator } = {},
    nodeCreators: { [tagName: string]: NodeCreator } = {}
) {
    const defaultNodeCreators = {
        state: createState,
        document: createDocument,
        text: createText,
        blocks: createBlock,
        inlines: createInline,
        marks: createMark
    };
    nodeCreators = {
        ...defaultNodeCreators,
        ...nodeCreators
    };

    // add a node creator for each items in the groups
    nodeCreators = Object
        .keys(groups)
        .reduce((acc, group) => addNodeCreators(
            groups[group],
            acc[group],
            acc
        ), nodeCreators);

    return (
        tagName: string,
        attributes: Object,
        ...children: Children
    ): Node => {
        if (attributes == null) {
            attributes = {};
        }

        const createNode =
            nodeCreators.hasOwnProperty(tagName)
                ? nodeCreators[tagName]
                : create;

        return createNode(tagName, attributes, children);
    };
}

export default createHyperscript;
