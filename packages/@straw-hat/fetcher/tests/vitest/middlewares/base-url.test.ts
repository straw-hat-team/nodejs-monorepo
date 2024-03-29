import { beforeEach, describe, expect, test } from 'vitest';
import { fetcher } from '../../../src';
import { baseUrl } from '../../../src/middlewares/base-url';
import { fetchMock } from '../setup';

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
