function hasMark(node, type) {
    return node.characters.every(
        character => character.marks.size > 0 && character.marks.every(
            mark => mark.get('type') === type
        )
    );
}

export default {
    hasMark
};
