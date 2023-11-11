import { createMiddleware } from '../middleware.js';

export const doNothing = createMiddleware((next) => (request) => next(request));
