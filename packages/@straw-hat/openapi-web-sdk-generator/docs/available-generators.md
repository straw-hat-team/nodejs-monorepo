# Available Generators

## Fetcher

Uses `@straw-hat/fetcher` client as the HTTP client.

```yaml
generators:
  - path: '@straw-hat/openapi-web-sdk-generator/dist/generators/fetcher/index.js'
    config:
      # Where the files will be created.
      outputDir: './operations'
```

## React Query Fetcher

Connects React Query and Fetcher together leveraging Fetcher generator.

```yaml
generators:
  - path: '@straw-hat/openapi-web-sdk-generator/dist/generators/react-query-fetcher/index.js'
    config:
      # Where the files will be created.
      outputDir: './operations'
      # Where the operations will be imported from.
      packageName: '@my-org/sdk'
```
