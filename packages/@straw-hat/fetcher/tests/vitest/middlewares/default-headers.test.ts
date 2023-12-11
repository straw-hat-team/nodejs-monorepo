import { beforeEach, describe, expect, test } from 'vitest';
import { fetcher } from '../../../src';
import { defaultHeaders } from '../../../src/middlewares/default-headers';
import { fetchMock } from '../setup';

describe('defaultHeaders', () => {
  beforeEach(() => {
    fetchMock.mockReset();
  });

  test('sets the json headers', async () => {
    const client = fetcher({
      middleware: defaultHeaders({
        Else: '123',
        Something: '123',
      }),
    });
    await client('https://app.acmec.com');

    expect(fetchMock.mock.calls[0][0].headers.get('Else')).toBe('123');
    expect(fetchMock.mock.calls[0][0].headers.get('Something')).toBe('123');
  });
});
