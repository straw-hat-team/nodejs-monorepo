import fetchMock from 'jest-fetch-mock';
import { fetcher } from '../../../src/index';
import { json } from '../../../src/middlewares/json';
import { HttpRequest } from '../../../src/request';

describe('json', () => {
  afterEach(() => fetchMock.resetMocks());

  it('formats the body as an string', async () => {
    const client = fetcher<Response, HttpRequest<any>>({ middleware: json() });
    await client('pepeg', {
      method: 'POST',
      body: { hello: 'world' },
    });
    // @ts-ignore
    expect(fetchMock.mock.calls[0][0].body.toString()).toBe('{"hello":"world"}');
  });

  it('sets content type to application/json', async () => {
    const client = fetcher<Response, HttpRequest<any>>({ middleware: json() });
    await client('pepeg', {
      method: 'POST',
      body: { hello: 'world' },
    });
    // @ts-ignore
    expect(fetchMock.mock.calls[0][0].headers.get('content-type')).toBe('application/json');
  });

  it('formats the response as json', async () => {
    fetchMock.mockResolvedValue(
      new Response('{"hello":"world"}', {
        headers: { 'content-type': 'application/json' },
        status: 200,
      })
    );

    const client = fetcher<Response, HttpRequest<any>>({ middleware: json() });

    const response = await client('pepeg', {
      method: 'POST',
      body: { hello: 'world' },
    });

    expect(response).toEqual({ hello: 'world' });
  });

  it('formats the response as json with custom json spec', async () => {
    fetchMock.mockResolvedValue(
      new Response('{"hello":"world"}', {
        headers: { 'content-type': 'application/vnd.schemaregistry.v1+json' },
        status: 200,
      })
    );

    const client = fetcher<Response, HttpRequest<any>>({ middleware: json() });

    const response = await client('pepeg', {
      method: 'POST',
      body: { hello: 'world' },
    });

    expect(response).toEqual({ hello: 'world' });
  });
});
