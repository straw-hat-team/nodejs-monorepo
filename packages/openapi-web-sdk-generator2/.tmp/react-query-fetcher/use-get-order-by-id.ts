import type { Fetcher } from '@straw-hat/fetcher';
import type { UseFetcherQueryArgs } from '@straw-hat/react-query-fetcher';
import type { GetOrderByIdResponse, GetOrderByIdParams } from '@my-sdk/pepeg';
import { createQueryKey, useFetcherQuery } from '@straw-hat/react-query-fetcher';
import { getOrderById } from '@my-sdk/pepeg';

type UseGetOrderByIdParams = Omit<GetOrderByIdParams, 'options'>;

type UseGetOrderByIdArgs<TData, TError> = Omit<
  UseFetcherQueryArgs<GetOrderByIdResponse, TError, TData, UseGetOrderByIdParams>,
  'queryKey' | 'endpoint'
>;

const QUERY_KEY = ['getOrderById'];

export function useGetOrderByIdQueryKey(params?: UseGetOrderByIdParams) {
  return createQueryKey(QUERY_KEY, params);
}

export function useGetOrderById<TData = GetOrderByIdResponse, TError = unknown>(
  client: Fetcher,
  args: UseGetOrderByIdArgs<TData, TError>
) {
  return useFetcherQuery<GetOrderByIdResponse, TError, TData, UseGetOrderByIdParams>(client, {
    ...args,
    queryKey: QUERY_KEY,
    endpoint: getOrderById,
  });
}
