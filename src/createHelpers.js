import createNode from './createNode';

function createHelpers(...args) {
    return args.reduce((acc, arg) => {
        const [type, ...rest] = [].concat(arg);
        acc[type] = createNode.bind(null, type, ...rest);
        return acc;
    }, {});
}

export default createHelpers;
