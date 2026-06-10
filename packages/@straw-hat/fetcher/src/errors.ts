import { getResponseBody } from './helpers.js';

export type FetcherErrorOptions = {
  status: number;
  statusText: string;
  body: any;
  url: string;
};

export class FetcherError<TBody = any> extends Error {
  readonly statusText: string;
  readonly status: number;
  readonly body: TBody;
  readonly url: string;

  constructor(args: FetcherErrorOptions) {
    super();

    // Set the prototype explicitly.
    Object.setPrototypeOf(this, FetcherError.prototype);

    // @ts-ignore TS doesn't know about captureStackTrace
    Error.captureStackTrace?.(this, FetcherError);

    this.name = 'FetcherError';
    this.status = args.status;
    this.statusText = args.statusText;
    this.body = args.body;
    this.url = args.url;
  }

  override get message() {
    return `${this.status} ${this.statusText} ${this.url}`;
  }
}

export async function errorFromResponse<TBody = any>(response: Response) {
  const body = await getResponseBody(response);
  return new FetcherError<TBody>({
    body,
    statusText: response.statusText,
    status: response.status,
    url: response.url,
  });
}
