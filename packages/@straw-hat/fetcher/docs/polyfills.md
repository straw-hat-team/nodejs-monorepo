# Polyfills

Since `fetcher` uses `fetch` API under the hood depending of your environment
you will need to polyfill your environment.

We do not want to make assumption of your environment and your needs so the
best we could do is to let you decide what you want to do and document about it.

Since NodeJS do not support `fetch` by default, you will need to polyfill your
environment and on browsers it will depend of your version.

We recommend to use [cross-fetch](https://github.com/lquixada/cross-fetch) for
polyfill.

So before importing the the package in your application make sure to initialize
the polyfill or provide own `fetch` implementation.

For example:

```javascript
// myHttpClient.js

// global fix
import 'cross-fetch/polyfill';
import { fetcher } from '@straw-hat/fetcher';

// or local fix

import nodeFetch from 'node-fetch';
const client = fetcher({ fetch: nodeFetch });
```
