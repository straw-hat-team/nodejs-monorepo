# @straw-hat/chainable-config

Use a chaining API to generate and simplify the modification of configurations.

## Usage

- [Reference guides](./docs/reference/index.html) Please use `yarn docs:reference`
  to generate the reference docs.

```typescript
import { ChainedMap, OrderableChainedMap, ChainedSet } from '@straw-hat/chainable-config';

const chainedMap = new ChainedMap();

// ..or

export class DevServer<P> extends ChainedMap<P> {
  bonjour(value: boolean) {
    return this.set('bonjour', value);
  }
}

class Resolve<P> extends ChainedMap<P> {
  constructor(parent: P) {
    super(parent);
    this.set(
      'extensions',
      new OrderableChainedMap(this, {
        // Its allows you to return the configuration as an array rather than an
        // object
        asArray: true,
        // Its allows you to return undefined in case there is not values set
        emptyAsUndefined: true,
      }),
    );
  }
}

class WebpackChain extends ChainedMap {
  // your own methods here..
  constructor() {
    super(undefined);
    this.set('devServer', new DevServer(this));
    this.set('resolve', new Resolve(this));
  }

  get devServer(): DevServer<WebpackChain> {
    return this.get('devServer');
  }

  bail(value: boolean) {
    return this.set('bail', value);
  }
}

const myConfig = new WebpackChain();

myConfig.bail(true).devServer.bonjour(true);

// Return the config
myConfig.toConfig();
// {
//   bail: true,
//   devServer: {
//     bonjour: true
//   }
// }
```
