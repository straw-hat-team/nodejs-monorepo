import * as React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { renderHook, act } from '@testing-library/react-hooks';
import { useFetcherQuery, useFetcherMutation, createQueryKey } from '../../src';

const queryClient = new QueryClient();

const wrapper = ({ children }: any) => <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;

describe('createQueryKey', () => {
  test('creating query keys', () => {
    expect(createQueryKey(['hello'])).toEqual(['hello']);
    expect(createQueryKey(['hello'], { path: { id: '123' } })).toEqual(['hello', { path: { id: '123' } }]);
  });
});

describe('useFetcherQuery', () => {
  test('sends the params to the operation', async () => {
    const client = jest.fn();
    const endpoint = jest.fn(async (_fetcher, _params) => ({ data: 'Hello' }));
    const { waitForNextUpdate } = renderHook(
      () =>
        useFetcherQuery(client, {
          queryKey: ['todos'],
          endpoint,
          params: {
            sortBy: 'title',
          },
        }),
      { wrapper }
    );

    await waitForNextUpdate();

    expect(endpoint.mock.calls[0][0]).toEqual(client);
    expect(endpoint.mock.calls[0][1]).toHaveProperty('options.signal');
    expect(endpoint.mock.calls[0][1]).toHaveProperty('sortBy');
  });
});

describe('useFetcherMutation', () => {
  test('sends the params to the operation', async () => {
    const client = jest.fn();
    const endpoint = jest.fn(async (_fetcher, _params) => ({ data: 'Hello' }));
    const {
      result: {
        current: { mutateAsync },
      },
    } = renderHook(() => useFetcherMutation<any, any, { account_id: string }>(client, { endpoint }), { wrapper });

    await act(() => mutateAsync({ account_id: '123' }));

    expect(endpoint.mock.calls[0][0]).toEqual(client);
    expect(endpoint.mock.calls[0][1]).toHaveProperty('account_id');
  });
});
