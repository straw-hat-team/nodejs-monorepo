import { errorFromResponse } from '../errors';
import { createMiddleware } from './middleware';

export function errorHandler() {
  return createMiddleware((next) => async (request) => {
    const response = await next(request);

    if (response.ok) {
      return response;
    }

    const error = await errorFromResponse(response);
    throw error;
  });
}
