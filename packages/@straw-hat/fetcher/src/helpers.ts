function isString(val: any): val is string {
  return typeof val === 'string';
}

export function getRequestBody(body: any): BodyInit | undefined {
  if (body === undefined) {
    return undefined;
  }

  if (body instanceof FormData) {
    return body;
  }

  if (body instanceof Blob) {
    return body;
  }

  if (body instanceof URLSearchParams) {
    return body;
  }

  if (isString(body)) {
    return body;
  }

  return JSON.stringify(body);
}

const JSON_CONTENT_TYPE_REGEX = /^application\/(.+\+)?json/;

export function getResponseBody(response: Response) {
  const contentType = response.headers.get('Content-Type') ?? '';
  const isJSON = JSON_CONTENT_TYPE_REGEX.test(contentType.toLowerCase());

  if (isJSON) {
    return response.json();
  }

  return response.text();
}
