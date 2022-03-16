import fetchMock from 'jest-fetch-mock';
import { fetcher } from '../../../src/index';
import { errorHandler } from '../../../src/middlewares/error-handler';

describe('errorHandler', () => {
  afterEach(() => fetchMock.resetMocks());

  it('when the request failed then it returns a fetcher error', async () => {
    fetchMock.mockResolvedValue(new Response('anything', { status: 500, statusText: 'Internal Server Error' }));

    const client = fetcher({ middleware: errorHandler() });

    expect(client('pepeg')).rejects.toThrow('Internal Server Error');
  });
  it('when the request succeed then it returns the response', async () => {
    fetchMock.mockResolvedValue(new Response('anything', { status: 200 }));

    const client = fetcher({ middleware: errorHandler() });

    expect(client('pepeg')).resolves.toBeInstanceOf(Response);
  });
});
