import { errorFromResponse } from '../errors.js';
import { createMiddleware } from '../middleware.js';

export function errorHandler<TBody = any>() {
  return createMiddleware((next) => async (request) => {
    const response = await next(request);

    if (response.ok) {
      return response;
    }

    throw await errorFromResponse<TBody>(response);
  });
}
