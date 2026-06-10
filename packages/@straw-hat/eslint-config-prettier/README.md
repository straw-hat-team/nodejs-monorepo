# @straw-hat/eslint-config-prettier

`ESLint` configurations for `@straw-hat/prettier-config` integration.

It makes sure that `ESLint` and `Prettier` works together without issues.

## Installation

Add the dependency.

```sh
yarn add -D @straw-hat/eslint-config-prettier
```

Make sure to install the peer dependencies.

```sh
npx install-peerdeps --dev @straw-hat/eslint-config-prettier
```

## Configuration

Extend your `ESLint` configuration.

```json
{
  "extends": ["@straw-hat/eslint-config-prettier"]
}
```
