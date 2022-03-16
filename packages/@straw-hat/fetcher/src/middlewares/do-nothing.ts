import { createMiddleware } from './middleware';

export const doNothing = createMiddleware((next) => (request) => next(request));
