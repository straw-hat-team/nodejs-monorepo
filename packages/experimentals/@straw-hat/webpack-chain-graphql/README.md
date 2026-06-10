# @straw-hat/webpack-chain-graphql

Adds support for GraphQL files.

## Get Started

### Installation

You need to add `graphql-tag` as well since it is a peer dependency.

```shell
yarn add graphql-tag
yarn add @straw-hat/webpack-chain-graphql -D
```

## Usage

- [Reference guides](./docs/reference/index.html) Please use `yarn docs:reference`
  to generate the reference docs.

```js
const { graphql } = require('@straw-hat/webpack-chain-graphql');

// Pass Webpack Chain config
graphql(config);

// Ready to 🎸
```
