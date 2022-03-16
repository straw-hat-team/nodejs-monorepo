import { createMiddleware } from './middleware';

export function defaultHeaders(headers: Record<any, any>) {
  return createMiddleware((next) => async (request) => {
    Object.entries(headers).forEach(([name, value]) => request.headers.append(name, value));

    return next(request);
  });
}
