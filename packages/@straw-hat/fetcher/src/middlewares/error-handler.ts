import { errorFromResponse } from '../errors';
import { createMiddleware } from './middleware';

export function errorHandler<TBody = any>() {
  return createMiddleware((next) => async (request) => {
    const response = await next(request);

    if (response.ok) {
      return response;
    }

    throw await errorFromResponse<TBody>(response);
  });
}
