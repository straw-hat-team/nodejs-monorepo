# Changelog

## Unreleased

## v3.0.1 - 2023-11-11

- Fix: `@straw-hat/fetcher` dependency version. It requires `v5.0.0` or higher.

## v3.0.0 - 2023-11-11

### Breaking Changes

- Fetcher generator requires `@straw-hat/fetcher@v5+`.
- Requires Node.js 16.0.0 or higher
- Generator paths are fully qualified, e.g. `@straw-hat/openapi-web-sdk-generator/dist/generators/fetcher/index.js`
  instead of `@straw-hat/openapi-web-sdk-generator/dist/generators/fetcher` since it is using ESM modules.

  ```yaml
  generators:
    # Before
    # - path: '@straw-hat/openapi-web-sdk-generator/dist/generators/fetcher'
    # - path: '@straw-hat/openapi-web-sdk-generator/dist/generators/react-query-fetcher'
    # After
    - path: '@straw-hat/openapi-web-sdk-generator/dist/generators/fetcher/index.js'
    - path: '@straw-hat/openapi-web-sdk-generator/dist/generators/react-query-fetcher/index.js'
  ```
