import { getResponseBody } from './helpers';

export type FetcherErrorOptions = {
  status: number;
  statusText: string;
  body: any;
  url: string;
};

export class FetcherError extends Error {
  statusText: string;
  status: any;
  body: any;
  url: string;

  constructor(args: FetcherErrorOptions) {
    super();

    // Set the prototype explicitly.
    Object.setPrototypeOf(this, FetcherError.prototype);

    this.name = 'FetcherError';
    this.status = args.status;
    this.statusText = args.statusText;
    this.body = args.body;
    this.url = args.url;
  }

  get message() {
    return `${this.status} ${this.statusText} ${this.url}`;
  }
}

export async function errorFromResponse(response: Response) {
  const body = await getResponseBody(response);
  return new FetcherError({
    body,
    statusText: response.statusText,
    status: response.status,
    url: response.url,
  });
}
