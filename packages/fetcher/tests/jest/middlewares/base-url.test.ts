import fetchMock from 'jest-fetch-mock';
import { fetcher } from '../../../src/index';
import { baseUrl } from '../../../src/middlewares/base-url';

describe('baseUrl', () => {
  afterEach(() => fetchMock.resetMocks());

  it('adds the base url to the path', async () => {
    const client = fetcher({ middleware: baseUrl('http://api.acmec.com/v2') });
    await client('pepeg');

    // @ts-ignore
    expect(fetchMock.mock.calls[0][0].url).toBe('http://api.acmec.com/v2/pepeg');
  });

  it('removes the backslash from the base url', async () => {
    const client = fetcher({ middleware: baseUrl('http://api.acmec.com/v2/') });
    await client('/pepeg');

    // @ts-ignore
    expect(fetchMock.mock.calls[0][0].url).toBe('http://api.acmec.com/v2/pepeg');
  });

  it('removes the backslash from the path', async () => {
    const client = fetcher({ middleware: baseUrl('http://api.acmec.com/v2/') });
    await client('/pepeg');

    // @ts-ignore
    expect(fetchMock.mock.calls[0][0].url).toBe('http://api.acmec.com/v2/pepeg');
  });
});
