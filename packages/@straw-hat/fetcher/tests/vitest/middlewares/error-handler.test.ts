import { expect, describe, test, beforeEach } from 'vitest';
import { fetchMock } from '../setup';
import { fetcher } from '../../../src';
import { errorHandler } from '../../../src/middlewares/error-handler';

describe('errorHandler', () => {
  beforeEach(() => {
    fetchMock.mockReset();
  });

  test('when the request failed then it returns a fetcher error', async () => {
    fetchMock.mockResolvedValue(new Response('anything', { status: 500, statusText: 'Internal Server Error' }));

    const client = fetcher({ middleware: errorHandler() });

    expect(client('https://app.acmec.com')).rejects.toThrow('Internal Server Error');
  });
  test('when the request succeed then it returns the response', async () => {
    fetchMock.mockResolvedValue(new Response('anything', { status: 200 }));

    const client = fetcher({ middleware: errorHandler() });

    expect(client('https://app.acmec.com')).resolves.toBeInstanceOf(Response);
  });
});
