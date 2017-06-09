/* @flow */

import { State, Document, Block, Inline, Text, Mark } from 'slate';

export type Node = State | Document | Block | Inline | Text | Mark;
export type Child = string | number | Node;
export type Children = Child[];
