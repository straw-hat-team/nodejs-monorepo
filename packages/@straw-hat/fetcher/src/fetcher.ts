import { compose, Dispatch, Middleware } from './middleware.js';
import { asNativeRequest, HttpRequest } from './request.js';

export type Fetch = typeof fetch;
export type Path = string;

export interface ClientConfiguration {
  middleware?: Middleware<any>;
  fetch?: Fetch;
}

function dispatcher(client: Fetch = fetch): Dispatch<Response> {
  return (request: HttpRequest) => client(asNativeRequest(request));
}

function withDefaults(request: Partial<HttpRequest>): Partial<HttpRequest> {
  return {
    context: {},
    credentials: 'same-origin',
    headers: new Headers(),
    mode: 'same-origin',
    ...request,
  };
}

export type Fetcher<T = Response, P = HttpRequest> = (path: string, options?: Partial<P>) => Promise<T>;

export function fetcher<T = Response, P = HttpRequest>(opts: ClientConfiguration = {}): Fetcher<T, P> {
  const dispatchRequest = dispatcher(opts.fetch);

  const dispatch = opts.middleware ? opts.middleware(dispatchRequest) : dispatchRequest;

  const executeRequest = compose(dispatch, withDefaults);

  return (path: Path, options: Partial<Omit<HttpRequest, 'url'>> = {}) => {
    return executeRequest({
      ...options,
      url: path,
    });
  };
}
