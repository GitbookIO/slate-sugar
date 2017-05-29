# slate-sugar

[![NPM version](https://badge.fury.io/js/slate-sugar.svg)](http://badge.fury.io/js/slate-sugar)
[![Build Status](https://travis-ci.org/GitbookIO/slate-sugar.png?branch=master)](https://travis-ci.org/GitbookIO/slate-sugar)

> Set of Slate helpers to create nodes and documents.

The purpose of slate-sugar is to make Slate nodes and documents creation:

* Painless by using smart defaults and inferring properties based on the input
* Comprehensible by offering an API that look like a structured document

Highly inspired by the hyper script convention[[1]](https://facebook.github.io/react/docs/react-without-jsx.html)[[2]](https://github.com/mlmorg/react-hyperscript).

## Install

```
yarn add slate-sugar
```

## Usage

```js
import { document, block, inline, range } from 'slate-sugar';

const heading   = block('heading');
const section   = block('section');
const paragraph = block('paragraph');
const link      = inline('link');
const bold      = range('bold');

document([
    section([
        heading('Super title'),
        paragraph('This paragraph contains a text node.'),
        paragraph([
            'And this one has a ',
            link({ href: '/' }, 'link'),
            ' in it, along with ',
            bold('some bold content.')
        ])
    ])
]);
```

## Documentation

Types prefixed by `Slate.` are Slate's exported types, other types are defined below:

```
type NodeIsh = string | number | Slate.Node | Object;
type NodeFactory = (data?: Object, nodes?: NodeIsh | NodeIsh[]) => Slate.Node
type Hyperscript = (type: string, props: Object, children: NodeIsh | NodeIsh[]): Slate.Document
```

### `block(type: string): NodeFactory`

Returns a function to create a `Slate.Block`.

**Example:**

```js
import { block } from 'slate-sugar';

const heading = block('heading');
heading();// creates a Slate.Block of type 'heading'
```

### `inline(type: string): NodeFactory`

Returns a function to create a `Slate.Inline`.

**Example:**

```js
import { inline } from 'slate-sugar';

const link = inline('link');
link();// creates a Slate.Inline of type 'link'
```

### `range(type: string): NodeFactory`

Returns a function to apply marks to a range.

**Example:**

```js
import { range } from 'slate-sugar';

const bold = range('bold');
bold('Bold content');// creates a Slate.Text with 'bold' applied to the range
```

### `document(nodes: Slate.Node[]): Slate.Document`

Creates a document containing `nodes`.

**Example:**

```js
import { document, block } from 'slate-sugar';

const paragraph = block('paragraph');

document([
    paragraph('This document contains a paragraph.'),
]);
```

### `createNode(type?: string, props?: Object, nodes?: NodeIsh | NodeIsh[]): Slate.Node`

Creates a `Slate.Node` from the provided definition.

**Example:**

```js
import createNode from 'slate-sugar';

createNode(null, { kind: 'document '}, [
    createNode('section', { kind: 'block' }, [
        createNode('heading', { kind: 'block' }, 'Super title'),
        createNode('paragraph', { kind: 'block' }, 'This paragraph contains a text node.'),
        createNode('paragraph', { kind: 'block' }, [
            'And this one has a',
            createNode('link', { kind: 'inline', data: { href: '/' } }, 'link'),
            ' in it, along with ',
            createNode({ kind: 'text', marks: ['bold'] }, 'some bold content.')
        ])
    ])
]);
```

### `createHyperscript({ blocks: string[], inlines: string[], marks: string[] }): Hyperscript`

Creates an hyper script compatible function.

**Example:**

```jsx harmony
/* @jsx h */

import { createHyperscript } from 'slate-sugar';

const h = createHyperscript({
    blocks: [
        'heading',
        'paragraph'
    ],
    inlines: [
        'link'
    ],
    marks: [
        'bold'
    ]
});

const document = (
    <document>
        <heading>Super title</heading>
        <paragraph>With a paragraph of text, a <link href="/home">link</link> and some <bold>bold content</bold>.</paragraph>
    </document>
);
```
