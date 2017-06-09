/* @flow */

import { State, Document, Block, Inline, Text, Mark } from 'slate';
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
type TypeMap = { [name: string]: string };
type NodeCreatorMap = { [tagName: string]: NodeCreator };

function addNodeCreators(
    typeMap: TypeMap,
    createNode: NodeCreator,
    initialValue: Object
): NodeCreatorMap {
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

type Groups = {
    [groupName: string]: TypeMap
};

function isChild(child: any): boolean {
    return (
           typeof child === 'string'
        || typeof child === 'number'
        || child instanceof State
        || child instanceof Document
        || child instanceof Block
        || child instanceof Inline
        || child instanceof Text
        || child instanceof Mark
    );
}

function createHyperscript(
    groups: Groups = {},
    nodeCreators: NodeCreatorMap = {}
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
        attributes?: Object,
        ...children: Children
    ): Node => {
        if (attributes == null) {
            attributes = {};
        }

        if (isChild(attributes)) {
            children = [attributes].concat(children);
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
