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
type Hyperscript = (type: string, props?: Object, children?: NodeIsh | NodeIsh[]): Slate.Document
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

### `createHyperscript(...fns: NodeFactory[]): { [string]: Hyperscript }`

Creates hyper script compatible functions and provide `Document` to be used as the root document.

**Example:**

```jsx harmony
/* @jsx createNode */

import { createHyperscript, createNode } from 'slate-sugar';

const {
    Document,
    Heading,
    Paragraph,
    Link,
    Bold
} = createHyperscript({
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
    <Document>
        <Heading>Super title</Heading>
        <Paragraph>With a paragraph of text, a <Link href="/home">link</Link> and some <Bold>bold content</Bold>.</Paragraph>
    </Document>
);
```
