# Middlewares

A middleware is something that could transform the request and/or response.

A middleware is a function that takes a the next dispatcher from the next
middleware as parameter and returns a promise of the implement of the current
middleware.

For understanding middleware, it is probably better to take a look at the type
specifications.

```typescript
// RequestInit comes from lib.dom.d.ts file
export interface HttpRequest extends RequestInit {
  context: Record<any, any>;
  headers: Headers;
  url: string;
}

export type Dispatch<T> = (request: HttpRequest) => Promise<T>;

export type Middleware<T, P = Response> = (next: Dispatch<P>) => Dispatch<T>;
```

For example, a middleware that log the requests.

```javascript
const logger = (next) => async (request) => {
  console.groupCollapsed('fetcher::logger');

  console.log('request', request);
  const response = await next(request);
  console.log('response', response);

  console.groupEnd();

  return response;
};
```

## Before and After Middleware

Since a middleware takes a dispatch of the next middleware the concept of
before and after middleware pretty much depends of the order on how you call
the `next` dispatcher.

For example

```javascript
const jsonMiddleware = (next) => async (request) => {
  // Do things before calling the next
  // AKA, Before middleware

  const response = await next(request);

  // Do things after calling the next
  // AKA, After middleware

  return response;
};
```
