# @straw-hat/cli

This package is the Core CLI.

## Installing the CLI

We encourage to install the CLI globally, this is not required, but this is
how we use it in our organization:

```shell
yarn global add @straw-hat/cli
```

### Extending the CLI

You can use `shc plugins:install` command to install additional plugins that
extend the CLI.

## Contributing to the CLI

Use `yarn start` to recompile the project in `watch mode`. Use `plugins`
commands to link or install new functionalities. Use `shc plugins --help` for
more information.

<!-- commands -->

## Command Topics

- [`shc autocomplete`](docs/commands/autocomplete.md) - display autocomplete installation instructions
- [`shc del`](docs/commands/del.md) - removes things
- [`shc gen`](docs/commands/gen.md) - multiple generators
- [`shc help`](docs/commands/help.md) - display help for shc
- [`shc info`](docs/commands/info.md) - gather relevant information about the CLI
- [`shc plugins`](docs/commands/plugins.md) - list installed plugins

<!-- commandsstop -->
