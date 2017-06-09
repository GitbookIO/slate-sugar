/* @flow */

import { State, Document, Block, Inline, Text, Mark } from 'slate';

export type Node = State | Document | Block | Inline | Text | Mark;
export type Children = Node[];
