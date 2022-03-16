import fetchMock from 'jest-fetch-mock';
import { fetcher } from '../../../src/index';
import { defaultHeaders } from '../../../src/middlewares/default-headers';

describe('defaultHeaders', () => {
  afterEach(() => fetchMock.resetMocks());

  it('sets the json headers', async () => {
    const client = fetcher({
      middleware: defaultHeaders({
        Else: '123',
        Something: '123',
      }),
    });
    await client('http://app.acmec.com');

    // @ts-ignore
    expect(fetchMock.mock.calls[0][0].headers.get('Else')).toBe('123');

    // @ts-ignore
    expect(fetchMock.mock.calls[0][0].headers.get('Something')).toBe('123');
  });
});
