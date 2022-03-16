import type { Fetcher } from '@straw-hat/fetcher';
import type { UseFetcherQueryArgs } from '@straw-hat/react-query-fetcher';
import type { GetInventoryResponse, GetInventoryParams } from '@my-sdk/pepeg';
import { createQueryKey, useFetcherQuery } from '@straw-hat/react-query-fetcher';
import { getInventory } from '@my-sdk/pepeg';

type UseGetInventoryParams = Omit<GetInventoryParams, 'options'>;

type UseGetInventoryArgs<TData, TError> = Omit<
  UseFetcherQueryArgs<GetInventoryResponse, TError, TData, UseGetInventoryParams>,
  'queryKey' | 'endpoint'
>;

const QUERY_KEY = ['getInventory'];

export function useGetInventoryQueryKey(params?: UseGetInventoryParams) {
  return createQueryKey(QUERY_KEY, params);
}

export function useGetInventory<TData = GetInventoryResponse, TError = unknown>(
  client: Fetcher,
  args: UseGetInventoryArgs<TData, TError>
) {
  return useFetcherQuery<GetInventoryResponse, TError, TData, UseGetInventoryParams>(client, {
    ...args,
    queryKey: QUERY_KEY,
    endpoint: getInventory,
  });
}
