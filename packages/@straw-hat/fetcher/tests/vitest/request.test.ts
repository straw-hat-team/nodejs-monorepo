import { expect, describe, test } from 'vitest';
import { cloneRequest, HttpRequest } from '../../src/request';

describe('cloneRequest', () => {
  test('clones the http client request into a native request', () => {
    const request: HttpRequest = {
      context: {
        foo: 'faa',
      },
      credentials: 'same-origin',
      headers: new Headers({
        'content-type': 'application/json',
      }),
      method: 'PATCH',
      mode: 'same-origin',
      url: '',
    };
    const newRequest = cloneRequest(request);

    newRequest.headers.set('something', '123');
    newRequest.context.hello = 'world';

    expect(request.headers.get('something')).toBe(null);
    expect(newRequest.context).not.toEqual(request.context);
  });
});
