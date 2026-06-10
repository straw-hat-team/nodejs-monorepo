# Changelog

## Unreleased

## v5.0.1 - 2023-11-11

- Fix exporting `Middleware` and `Dispatch` from the main entry point.

## v5.0.0 - 2023-11-11

### Breaking Changes

- Requires Node.js 16.0.0 or higher. This is due to the usage of ESM modules only.
- Imports are now done using ESM modules only. This means that you need to use `import` instead of `require`. As well
  as import paths depends on the `package.json` `exports` field. Please check the configuration of `pkg#exports` for
  more information.
