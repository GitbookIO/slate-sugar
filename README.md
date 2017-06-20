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

## Usage

### Basic

This is the quickest way to use `slate-sugar`. If you need a terser syntax, you should [declare a type mapping beforehand](#with-mapping).

```jsx harmony
/* @jsx h */
import createHyperscript from 'slate-sugar';

const h = createHyperscript();
const document = (
    <document>
        <heading kind="block" data={{ id: 'introduction' }}>
            Introduction
        </heading>
        <paragraph kind="block">
            This is a super <text marks={['bold']}>bold</text> paragraph.
            Also, it has a <link kind="inline" data={{ href: '/' }}>link</link> in it.
        </paragraph>
    </document>
);
```

### With Mapping

Here is the recommended way to use `slate-sugar`, leading to the leanest code. The only difference is that you declare your blocks, inlines and marks types ahead of time.

```jsx harmony
/* @jsx h */
import createHyperscript from 'slate-sugar';

const h = createHyperscript({
    blocks: {
        // Keys here can then be used as tag name.
        // They will be recognized as blocks, and will be assigned the correct type.
        heading: 'TYPE_HEADING',
        paragraph: 'TYPE_PARAGRAPH'
    },
    inlines: {
        link: 'TYPE_LINK'
    },
    marks: {
        bold: 'TYPE_BOLD'
    }
});
const document = (
    <document>
        <heading id="introduction">
            Introduction
        </heading>
        <paragraph>
            This is a super <bold>bold</bold> paragraph.
            Also, it has a <link href="/">link</link> in it.
        </paragraph>
    </document>
);
```

## Documentation

### `createHyperscript([groups], [nodeCreators])`

* `groups?: { [groupName: string]: { [key: string]: string } }`: groups of types in the form of constants.
* `nodeCreators?: { [tagName: string]: (tagName, attributes, children) => Slate.Node }`: mapping of functions to use to create a Node from a given tag name.

Returns a JSX-compatible function.

By default, `slate-sugar` is able to create:

* `blocks`: creates a `Slate.BLock` with type being the tag name, the rest is considered data.
* `inlines`: creates a `Slate.Inline` with type being the tag name, the rest is considered data.
* `marks`: creates a `Slate.Text` with type being a mark applied to the text, the rest is considered the mark's data.
* `state`: creates a `Slate.State` (must have a single child of type `Slate.Document`)
* `document`: creates a `Slate.Document`
* `text`: creates a `Slate.Text` with marks if passed (`<text marks={[...]} />`)
