import { getRequestBody, getResponseBody } from '../helpers';
import { createMiddleware } from './middleware';

export function json() {
  return createMiddleware((next) => async (request) => {
    request.headers.set('content-type', 'application/json');
    request.body = getRequestBody(request.body);
    const response = await next(request);
    return getResponseBody(response);
  });
}
