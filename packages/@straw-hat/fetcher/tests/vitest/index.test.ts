import { beforeEach, describe, expect, test, vi } from 'vitest';
import { fetcher } from '../../src';
import { composeMiddleware } from '../../src/middleware';
import { fetchMock } from './setup';

const path = 'https://app.acmec.com';

describe('fetcher', () => {
  beforeEach(() => {
    fetchMock.mockReset();
  });

  describe('calling the fetch client', () => {
    test('using the global client', async () => {
      const client = fetcher();

      await client(path);

      expect(fetchMock.mock.calls[0][0].method).toEqual('GET');
    });

    test('using the provided client', async () => {
      const fetchSpy = vi.fn();
      const client = fetcher({ fetch: fetchSpy });

      await client(path);

      expect(fetchSpy).toHaveBeenCalled();
    });
  });

  test('calls the middleware', async () => {
    const middleware = vi.fn((next) => next);
    const client = fetcher({ middleware: composeMiddleware(middleware) });

    await client(path);

    expect(middleware).toBeCalled();
  });
});
