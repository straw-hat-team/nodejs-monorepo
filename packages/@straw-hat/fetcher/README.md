# @straw-hat/fetcher

HTTP client, based on middleware pipeline.

## Installation

```shell
yarn add @straw-hat/fetcher
```

## Usage

- [Reference guides](./docs/reference/index.html) Please use `yarn docs:reference`
  to generate the reference docs.

### Creating the client

First we need to create an instance of the client.

This instance will have the middleware based on your needs (More about
middleware later, keep reading).

For this example we will using `baseUrl` middleware.

> **Note**
>
> Check `middlewares` folder for the list of supported middleware. Suggestions
> for new middleware are open.

```javascript
// myHttpClient.js
import { baseUrl } from '@straw-hat/fetcher/dist/middlewares/base-url';
import { json } from '@straw-hat/fetcher/dist/middlewares/json';
import { errorHandler } from '@straw-hat/fetcher/dist/middlewares/error-handler';
import { defaultHeaders } from '@straw-hat/fetcher/dist/middlewares/default-headers';
import { doNothing } from '@straw-hat/fetcher/dist/middlewares/do-nothing';
import { composeMiddleware } from '@straw-hat/fetcher/dist/middlewares/middleware';
import { fetcher } from '@straw-hat/fetcher';

export const client = fetcher({
  middleware: composeMiddleware(
    // Add default headers
    defaultHeaders({
      'User-Agent': 'MyApp/1.0',
    }),
    // Concatenate the base url with the current URL.
    baseUrl('http://api.myapp.com/v1'),
    // - Serialize body into JSON and add content type application/json
    // - Deserialize JSON responses
    json(),
    // Standard error handler from fetcher
    errorHandler(),
    // A middleware that does nothing, useful for noop default values thou
    doNothing
  ),
});
```

Notice that `composeMiddleware` takes a list of middleware as parameters and
returns composed middleware for the client.

Now you can start using `client` 🎸🎉🎊.

### Using the client

```javascript
// This is where we exported our client from the previous example.
import client from './myHttpClient';

(async () => {
  const json = await client('/example.com').json();

  console.log(json);
  //=> `{data: 'Hola, Mundo 🌍'}`
})();
```

## What is next?

- [Middlewares](docs/middlewares.md)
- [Polyfills](docs/polyfills.md)
- [OpenAPI](docs/openapi.md)
