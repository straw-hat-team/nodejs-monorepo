# @straw-hat/tsconfig

Base TypeScript configurations.

- [References](#references)
- [How-To Guides](#how-to-guides)

## References

The following is the of available configuration types:

- **base**: for the baseline for your projects.
- **react.nextjs**: for React NextJS applications.
- **react.cra**: for React CRA-like web applications.
- **react.lib**: for React libraries.
- **cypress**: for Cypress tests.

## How-To Guides

### Get Started

1. Install the dependency in your package:

   ```sh
   yarn add -D @straw-hat/tsconfig
   ```

2. Extend your `tsconfig.json` files.

   ```json
   {
     "extends": "@straw-hat/tsconfig/lib/{type}"
   }
   ```
