import { getRequestBody, getResponseBody } from '../helpers.js';
import { createMiddleware } from '../middleware.js';

export function json() {
  return createMiddleware((next) => async (request) => {
    request.headers.set('content-type', 'application/json');
    request.body = getRequestBody(request.body);
    const response = await next(request);
    return getResponseBody(response);
  });
}
