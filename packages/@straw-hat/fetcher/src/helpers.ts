function isString(val: any): val is string {
  return typeof val === 'string';
}

function isBlob(value: any): value is Blob {
  return value instanceof Blob;
}

// TODO: Support other types of body:
// 1. json
// 2. text
// 3. blob
// 4. arrayBuffer
// 5. formData
export function getRequestBody(body: any): BodyInit | undefined {
  if (body === undefined) {
    return undefined;
  }

  if (isString(body)) {
    return body;
  }

  if (isBlob(body)) {
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
