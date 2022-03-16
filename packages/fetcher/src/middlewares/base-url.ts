import { createMiddleware } from './middleware';

function normalizeUrl(url: string) {
  return url.endsWith('/') ? url.substring(0, url.length - 1) : url;
}

export function baseUrl(url: string) {
  const normalizedBaseUrl = normalizeUrl(url);

  return createMiddleware((next) => (request) => {
    const normalizedUrl = request.url.startsWith('/') ? request.url.substring(1, request.url.length) : request.url;

    request.url = `${normalizedBaseUrl}/${normalizedUrl}`;

    return next(request);
  });
}
