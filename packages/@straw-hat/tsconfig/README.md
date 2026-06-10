# @straw-hat/tsconfig

Base TypeScript configurations.

- [References](#references)
- [How-To Guides](#how-to-guides)

## References

The following is the list of available configuration types:

- `@straw-hat/tsconfig/lib/base`: Modern baseline for your projects (skipLibCheck, target es2022, strict, etc).
- `@straw-hat/tsconfig/lib/lib`: For Node.js libraries (declaration, composite, NodeNext, etc).
- `@straw-hat/tsconfig/lib/browser.lib`: For browser libraries (adds DOM libs).
- `@straw-hat/tsconfig/lib/react.lib`: For React libraries (adds JSX and DOM libs).
- `@straw-hat/tsconfig/lib/react.nextjs`: For React Next.js applications (Preserve modules, noEmit, DOM libs).
- `@straw-hat/tsconfig/lib/react.cra`: For React CRA-like web applications (Preserve modules, noEmit, DOM libs).
- `@straw-hat/tsconfig/lib/cypress`: For Cypress tests (CommonJS, DOM libs).

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

- For libraries in a monorepo, use `lib` or `react.lib` and set `composite: true` and `declarationMap: true`.
- For browser/React projects, use `browser.lib`, `react.lib`, `react.nextjs`, or `react.cra` as appropriate.
- For Cypress, use `cypress`.

See each config file for the exact options included.
