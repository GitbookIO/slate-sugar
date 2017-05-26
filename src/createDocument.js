import Slate from 'slate';

function createDocument(nodes, options = {}) {
    return Slate.Raw.deserializeDocument({ nodes }, {
        terse: true,
        ...options
    });
}

export default createDocument;
