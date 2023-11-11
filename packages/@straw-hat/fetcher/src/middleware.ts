import { HttpRequest } from './request.js';

export type Dispatch<T> = (request: HttpRequest) => Promise<T>;
export type Middleware<T, P = Response> = (next: Dispatch<P>) => Dispatch<T>;

export function compose(...fns: any[]) {
  return fns.reduce(
    (a, b) =>
      (...args: any[]) =>
        a(b(...args))
  );
}

/**
 * Compose the list of middleware into a single middleware.
 * @param middlewares List of middleware
 */
export function composeMiddleware<T = any>(...middlewares: Array<Middleware<T, any>>) {
  if (middlewares.length === 0) {
    return (arg: any) => arg;
  }

  if (middlewares.length === 1) {
    return middlewares[0];
  }

  return compose(...middlewares);
}

/**
 * This function doesn't really "do anything" at runtime, it's just the identity
 * function. Its only purpose is to defeat TypeScript's type.
 * @param middleware The middleware
 */
export function createMiddleware<T, P = Response>(middleware: Middleware<T, P>): Middleware<T, P> {
  return middleware;
}
