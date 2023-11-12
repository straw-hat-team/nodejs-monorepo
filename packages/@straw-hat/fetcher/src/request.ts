export type HttpRequestContext = Record<any, any>;

export interface HttpRequest<Body extends BodyInit = BodyInit> extends RequestInit {
  /**
   * A metadata object. Useful for pass some metadata cross middleware.
   */
  context: HttpRequestContext;
  headers: Headers;
  url: string;
  body?: Body;
}

/**
 * Transform a HttpRequest into an native Request.
 * @param request
 */
export function asNativeRequest(request: HttpRequest) {
  const { url, context, ...requestInit } = request;
  return new Request(request.url, requestInit);
}

/**
 * Clone a HttpRequest.
 * @param request
 */
export function cloneRequest(request: HttpRequest): HttpRequest {
  return {
    ...request,
    context: {
      ...request.context,
    },
    headers: new Headers(request.headers),
  };
}
