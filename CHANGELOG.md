# Change Log
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/) and this project adheres to [Semantic Versioning](http://semver.org/).

## [0.6.0](https://github.com/GitbookIO/slate-sugar/compare/0.5.0...0.6.0) - 2017-09-07

- Add support for keys as a special attributes

## [0.5.0](https://github.com/GitbookIO/slate-sugar/compare/0.4.0...0.5.0) - 2017-06-20

- Remove groups keys normalization

## [0.4.0](https://github.com/GitbookIO/slate-sugar/compare/0.3.0...0.4.0) - 2017-06-09

- Fix `<text />` creation when children is already a text node
- Removed support for list of strings in `groups`, now it must be `{ [groupName]: { [tagName]: type } }`
- Change custom node creators to return a `Slate.Node`
    - Also, their signature changed to `(tagName: string, attributes: Object, children: [string | number | Slate.Node]) => Slate.Node`
- Change custom node creators to be the second arguments, you can't mix groups and node creators anymore
- Add support for calls to `createHyperscript()` without the `attributes` argument
- Add support for children as an array

## [0.3.0](https://github.com/GitbookIO/slate-sugar/compare/0.2.0...0.3.0) - 2017-06-07

- Add `<state>` to create a `Slate.State` with its child `<document />`
- Fix text node creation with non-text siblings

## [0.2.0](https://github.com/GitbookIO/slate-sugar/compare/0.1.0...0.2.0) - 2017-06-02

- Add support for maps of `<name, type>`
- Add transformers to define more advanced nodes and override defaults
