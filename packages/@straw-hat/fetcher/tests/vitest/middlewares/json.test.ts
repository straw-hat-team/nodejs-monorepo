import { expect, describe, test, beforeEach } from 'vitest';
import { fetchMock } from '../setup';
import { fetcher } from '../../../src';
import { json } from '../../../src/middlewares/json';
import { HttpRequest } from '../../../src/request';

describe('json', () => {
  beforeEach(() => {
    fetchMock.mockReset();
    fetchMock.mockResolvedValue(new Response('anything', { status: 200 }));
  });

  test('formats the body as an string', async () => {
    const client = fetcher<Response, HttpRequest<any>>({ middleware: json() });
    await client('https://app.acmec.com', {
      method: 'POST',
      body: { hello: 'world' },
    });

    expect(await fetchMock.mock.calls[0][0].text()).toBe('{"hello":"world"}');
  });

  test('sets content type to application/json', async () => {
    const client = fetcher<Response, HttpRequest<any>>({ middleware: json() });
    await client('https://app.acmec.com', {
      method: 'POST',
      body: { hello: 'world' },
    });

    expect(fetchMock.mock.calls[0][0].headers.get('content-type')).toBe('application/json');
  });

  test('formats the response as json', async () => {
    fetchMock.mockResolvedValue(
      new Response('{"hello":"world"}', {
        headers: { 'content-type': 'application/json' },
        status: 200,
      }),
    );

    const client = fetcher<Response, HttpRequest<any>>({ middleware: json() });

    const response = await client('https://app.acmec.com', {
      method: 'POST',
      body: { hello: 'world' },
    });

    expect(response).toEqual({ hello: 'world' });
  });

  test('formats the response as json with custom json spec', async () => {
    fetchMock.mockResolvedValue(
      new Response('{"hello":"world"}', {
        headers: { 'content-type': 'application/vnd.schemaregistry.v1+json' },
        status: 200,
      }),
    );

    const client = fetcher<Response, HttpRequest<any>>({ middleware: json() });

    const response = await client('https://app.acmec.com', {
      method: 'POST',
      body: { hello: 'world' },
    });

    expect(response).toEqual({ hello: 'world' });
  });
});
