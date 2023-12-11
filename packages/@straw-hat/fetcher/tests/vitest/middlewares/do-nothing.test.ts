import { beforeEach, describe, expect, test } from 'vitest';
import { fetcher } from '../../../src';
import { doNothing } from '../../../src/middlewares/do-nothing';
import { fetchMock } from '../setup';

describe('doNothing', () => {
  beforeEach(() => {
    fetchMock.mockReset();
  });

  test('when calling the middleware then returns the response as it is', async () => {
    const response = new Response('anything', { status: 200 });
    fetchMock.mockResolvedValue(response);
    const client = fetcher({ middleware: doNothing });

    expect(client('https://app.acmec.com')).resolves.toEqual(response);
  });
});
