# @straw-hat/jest-config-chain

## Usage

- [Reference guides](./docs/reference/index.html) Please use `yarn docs:reference`
  to generate the reference docs.

You can start creating a Jest configuration. For this guide, our example base
configuration will be `jest.config.js` in the root of our project directory.

```js
// jest.config.js
const { JestConfigChain } = require('@straw-hat/jest-config-chain');

const config = new JestConfigChain();

config.setupFilesAfterEnv
  .add('app', '<rootDir>/jest.setup.js')
  .end()
  .testMatch.add('<rootDir>/tests/jest/**/*.test.(js|jsx|ts|tsx)')
  .end()
  .moduleNameMapper.set('^@/(.*)$', '<rootDir>/src/$1', { alias: 'appRoot' })
  .set('^image![a-zA-Z0-9$_-]+$', 'GlobalImageStub', { alias: 'images' })
  .end()
  .transform.set('^.+\\.(ts|tsx)$', '<rootDir>/node_modules/babel-jest', { alias: 'babel' })
  .end();

// config.toConfig() returns the raw object
module.exports = config.toConfig();
```
