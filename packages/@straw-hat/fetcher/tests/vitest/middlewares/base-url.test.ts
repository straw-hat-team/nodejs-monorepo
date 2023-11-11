import { expect, describe, test, beforeEach } from 'vitest';
import { fetchMock } from '../setup';
import { fetcher } from '../../../src';
import { baseUrl } from '../../../src/middlewares/base-url';

describe('baseUrl', () => {
  beforeEach(() => {
    fetchMock.mockReset();
  });

  test('adds the base url to the path', async () => {
    const client = fetcher({ middleware: baseUrl('https://api.acmec.com/v2') });
    await client('pepeg');

    expect(fetchMock.mock.calls[0][0].url).toBe('https://api.acmec.com/v2/pepeg');
  });

  test('removes the backslash from the base url', async () => {
    const client = fetcher({ middleware: baseUrl('https://api.acmec.com/v2/') });
    await client('/pepeg');

    expect(fetchMock.mock.calls[0][0].url).toBe('https://api.acmec.com/v2/pepeg');
  });

  test('removes the backslash from the path', async () => {
    const client = fetcher({ middleware: baseUrl('https://api.acmec.com/v2/') });
    await client('/pepeg');

    expect(fetchMock.mock.calls[0][0].url).toBe('https://api.acmec.com/v2/pepeg');
  });
});
