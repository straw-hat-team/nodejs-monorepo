import fetchMock from 'jest-fetch-mock';
import { fetcher } from '../../../src/index';
import { doNothing } from '../../../src/middlewares/do-nothing';

describe('doNothing', () => {
  afterEach(() => fetchMock.resetMocks());

  it('when calling the middleware then returns the response as it is', async () => {
    const response = new Response('anything', { status: 200 });
    fetchMock.mockResolvedValue(response);
    const client = fetcher({ middleware: doNothing });

    expect(client('pepeg')).resolves.toEqual(response);
  });
});
