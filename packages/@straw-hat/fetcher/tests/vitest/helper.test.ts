import { describe, expect, test } from 'vitest';
import { getRequestBody, getResponseBody } from '../../src/helpers';

describe('getResponseBody', () => {
  test('formats the response as json', async () => {
    const body = JSON.stringify({ hello: 'world' });
    const response = new Response(body, {
      headers: new Headers([['Content-Type', 'application/json; charset=utf-8;']]),
    });
    const data = await getResponseBody(response);
    expect(data).toEqual({ hello: 'world' });
  });

  test('formats the response as text', async () => {
    const response = new Response('something', {
      headers: new Headers([['Content-Type', 'application/text']]),
    });
    const data = await getResponseBody(response);
    expect(data).toBe('something');
  });
});

describe('getRequestBody', () => {
  test('formats an string body', () => {
    expect(getRequestBody('helloworld')).toBe('helloworld');
  });

  test('ignores undefined body', () => {
    expect(getRequestBody(undefined)).toBe(undefined);
  });

  test('formats the object body to string', () => {
    const expected = JSON.stringify({
      hello: 'world',
    });
    expect(
      getRequestBody({
        hello: 'world',
      }),
    ).toBe(expected);
  });

  test('returns blob body as it is', () => {
    const blob = new Blob();
    expect(getRequestBody(blob)).toBe(blob);
  });
});
