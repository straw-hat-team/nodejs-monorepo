import fetchMock from 'jest-fetch-mock';
import { fetcher } from '../../src';
import { composeMiddleware } from '../../src/middlewares/middleware';

const path = 'http://app.acmec.com';

describe('fetcher', () => {
  afterEach(() => fetchMock.resetMocks());

  describe('calling the fetch client', () => {
    it('using the global client', async () => {
      const client = fetcher();

      await client(path);

      // @ts-ignore
      expect(fetchMock.mock.calls[0][0].method).toEqual('GET');
    });

    it('using the provided client', async () => {
      const fetchSpy = jest.fn();
      const client = fetcher({ fetch: fetchSpy });

      await client(path);

      expect(fetchSpy).toHaveBeenCalled();
    });
  });

  it('calls the middleware', async () => {
    const middleware = jest.fn((next) => next);
    const client = fetcher({ middleware: composeMiddleware(middleware) });

    await client(path);

    expect(middleware).toBeCalled();
  });
});
