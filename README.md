# slate-sugar

[![NPM version](https://badge.fury.io/js/slate-sugar.svg)](http://badge.fury.io/js/slate-sugar)
[![Build Status](https://travis-ci.org/GitbookIO/slate-sugar.png?branch=master)](https://travis-ci.org/GitbookIO/slate-sugar)

> Create Slate documents using JSX.

The purpose of slate-sugar is to make Slate nodes and documents creation:

* Painless by using smart defaults and inferring properties based on the input
* Comprehensible by offering a declarative way to create structured documents

## Install

```
yarn add slate-sugar
```

## Documentation

### `createHyperscript({ blocks, inlines, marks })`

* `blocks: string[]` list of tags to be considered `Block`
* `inlines: string[]` list of tags to be considered `Inline`
* `marks: string[]` list of tags to be considered `Text` with `Mark`s applied to the range

Returns a JSX-compatible function.

**Example:**

```jsx harmony
/* @jsx h */

import createHyperscript from 'slate-sugar';

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
