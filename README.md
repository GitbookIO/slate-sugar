# slate-sugar

[![NPM version](https://badge.fury.io/js/slate-sugar.svg)](http://badge.fury.io/js/slate-sugar)
[![Build Status](https://travis-ci.org/GitbookIO/slate-sugar.png?branch=master)](https://travis-ci.org/GitbookIO/slate-sugar)

Set of Slate helpers to create nodes and documents.

## Install

```
yarn add slate-sugar
```

## Motivation

The purpose of slate-sugar is to make Slate nodes and documents creation:

* Painless by using smart defaults and inferring properties based on the input
* Comprehensible by offering an API that look like a structured document

Highly inspired by the hyper script convention[[1]](https://facebook.github.io/react/docs/react-without-jsx.html)[[2]](https://github.com/mlmorg/react-hyperscript).

## Simple Usage

```js
import { document, block, inline, mark } from 'slate-sugar';

const heading   = block('heading');
const section   = block('section');
const paragraph = block('paragraph');
const link      = inline('link');
const bold      = mark('bold');

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

slate-sugar exports a set of helpers to create Slate nodes:

* block
* inline
* mark

They all accept a `type` (string) and return the following function:

```
(data?: Object, nodes?: string | number | (string | number | Object)[]) => Slate.Node
```

* **data**: node's data
* **nodes**: node's children

Those arguments are both optional.
When omitted, data is empty and nodes is an empty list of nodes.

Note that you can omit `data` and still pass `nodes`, for example:

```js
import { block } from 'slate-sugar';

const paragraph = block('paragraph');
paragraph('Some text.');
```

Here the paragraph will contain a single text child node.

### `document(nodes: Slate.Node[]): Slate.Document`

Creates a document containing `nodes`.
