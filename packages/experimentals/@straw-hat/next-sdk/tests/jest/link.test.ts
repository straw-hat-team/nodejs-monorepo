import { describe, test, expect, vi } from 'vitest';
import { makeUrlFor } from '../../src/helpers';

describe('createUrlFor', () => {
  test('given a configuration with query types when creating the url then construct the url with the query params', () => {
    // GIVEN
    const expectedUrl = { pathname: '/hello-world/123', query: { sort: 'asc' } };
    const url = makeUrlFor<{ id: string }, { sort: 'asc' | 'desc' }>('/hello-world/{id}');
    // WHEN
    const finalUrl = url({
      path: { id: '123' },
      query: { sort: 'asc' },
    });
    // THEN
    expect(expectedUrl).toEqual(finalUrl);
  });
});
