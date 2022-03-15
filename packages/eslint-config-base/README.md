# @straw-hat/eslint-config-base

`ESLint` base configurations.

## Installation

Add the dependency.

```sh
yarn add -D @straw-hat/eslint-config-base
```

Make sure to install the peer dependencies.

```sh
npx install-peerdeps --dev @straw-hat/eslint-config-base
```

## Configuration

Extend your `ESLint` configuration.

```json
{
  "extends": ["@straw-hat/eslint-config-base"]
}
```

## Linting files

### CLI

Linting every file as you save it is nice, but we can also format all source
files at once using ESLint CLI.

In the `package.json`, add a `lint` script to lint files matching the mask,
and to write them back to disk. Also add `lint:ci` script to check for
existing issues in CI.

```json
{
  "scripts": {
    "lint": "eslint '**/*' --fix",
    "lint:ci": "yarn lint --output-file tmp/eslint/report.json --format json"
  }
}
```

### Staged files on commit

Whenever we work with files locally, we might accidentally commit them without
proper linting.

That's where Git hooks and linting staged files comes in
handy. To consistently lint all files before committing and then commit
changes, we recommend using [husky](https://github.com/typicode/husky) +
[lint-staged](https://github.com/okonet/lint-staged) combination of tools.

```sh
yarn add -D husky lint-staged
```

Now configure pre-commit hook to run Prettier against staged JavaScript files.

Create `.huskyrc.json` with the following content.

```js
{
  "hooks": {
    "pre-commit": "lint-staged"
  }
}
```

Create `.lintstagedrc.json` with the following content.

```js
{
  "**/*": ["eslint --fix", "git add"]
}
```

See [lint-staged code formatting documentation](https://github.com/okonet/lint-staged#reformatting-the-code).

> You can skip the Git pre-commit hook by committing with -n flag.

### VSCode

Install [ESLint VSCode extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
called `dbaeumer.vscode-eslint`.

1. Launch VS Code Quick Open (Ctrl+P)
2. Run the following command

```text
ext install dbaeumer.vscode-eslint
```

Because you might have global settings related to code formatting, we suggest
having in each repository a file with local workspace VSCode settings. Commit
this file `.vscode/settings.json` to source control to make sure everyone uses
the same extension to format the code.

```json
.vscode/settings.json

{
  "editor.defaultFormatter": "dbaeumer.vscode-eslint",
  "editor.formatOnSave": true,
  "eslint.enable": true,
  "eslint.alwaysShowStatus": true,
  "eslint.autoFixOnSave": true
}
```

## Tips

### Ignoring files

Sometimes you have files that should not be formatted, use `.eslintignore` to
ignore files.

```text
LICENSE
yarn.lock
*.log
*.json
*.md
*.js.map
mocha.opts
**/dist/**
tmp
*.cmd
```
