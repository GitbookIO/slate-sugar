import { block, inline, range, document } from './shorthands';

function toMap(types, shorthand, initialMap) {
    return types.reduce((acc, type) => ({
        [type]: shorthand(type),
        ...acc
    }), initialMap);
}

function createHyperscript({ blocks = [], inlines = [], marks = [] } = {}) {
    const fns = toMap(
        marks,
        range,
        toMap(
            inlines,
            inline,
            toMap(
                blocks,
                block,
                {
                    document: (data, nodes) => document(nodes)
                }
            )
        )
    );
    return (type, data, ...nodes) => {
        if (fns[type] == null) {
            throw new Error(`Cannot create node from unknown type "${type}"`);
        }

        return fns[type](data, nodes);
    };
}

export default createHyperscript;
