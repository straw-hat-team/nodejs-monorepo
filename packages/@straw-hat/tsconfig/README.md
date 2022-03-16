# @straw-hat/tsconfig

Base TypeScript configurations.

- [References](#references)
- [How-To Guides](#how-to-guides)

## References

The following is the of available configuration types:

- `@straw-hat/tsconfig/lib/base`: for the baseline for your projects.
- `@straw-hat/tsconfig/lib/react.nextjs`: for React NextJS applications.
- `@straw-hat/tsconfig/lib/react.cra`: for React CRA-like web applications.
- `@straw-hat/tsconfig/lib/react.lib`: for React libraries.
- `@straw-hat/tsconfig/lib/cypress`: for Cypress tests.
- `@straw-hat/tsconfig/lib/browser.lib`: for libraries that are intended to be used in the browser.

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
