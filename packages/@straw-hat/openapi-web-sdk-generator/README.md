# @straw-hat/openapi-web-sdk-generator

## Usage

- [Reference guides](./docs/references/index.html) Please use `yarn docs:reference`
  to generate the reference docs.

Before anything, we need to enable the generators, to do that we will create a
file in the package root directory following [cosmiconfig](https://www.npmjs.com/package/cosmiconfig)
configuration.

```bash
touch openapi-web-sdk-generator.config.yaml
```

Then add the generators.

```yaml
// <rootDir>/openapi-web-sdk-generator.config.yaml

generators:
  - path: '@straw-hat/openapi-web-sdk-generator/dist/generators/fetcher'
    config:
      outputDir: './operations'
```

Run the generator command.

```bash
sht-openapi-web-sdk-generator local \
  --config='./data/openapi.json'
```

<!-- commands -->

# Command Topics

- [`sht-openapi-web-sdk-generator help`](docs/commands/help.md) - Display help for sht-openapi-web-sdk-generator.
- [`sht-openapi-web-sdk-generator local`](docs/commands/local.md) - Generate the code from a local OpenAPI V3 file.

<!-- commandsstop -->

## What's next?

- [Available generators](docs/available-generators.md)
- [Custom generators](docs/custom-generators.md)
