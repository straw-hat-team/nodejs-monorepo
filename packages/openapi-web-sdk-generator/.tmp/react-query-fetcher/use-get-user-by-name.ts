import type { Fetcher } from '@straw-hat/fetcher';
import type { UseFetcherQueryArgs } from '@straw-hat/react-query-fetcher';
import type { GetUserByNameResponse, GetUserByNameParams } from '@my-sdk/pepeg';
import { createQueryKey, useFetcherQuery } from '@straw-hat/react-query-fetcher';
import { getUserByName } from '@my-sdk/pepeg';

type UseGetUserByNameParams = Omit<GetUserByNameParams, 'options'>;

type UseGetUserByNameArgs<TData, TError> = Omit<
  UseFetcherQueryArgs<GetUserByNameResponse, TError, TData, UseGetUserByNameParams>,
  'queryKey' | 'endpoint'
>;

const QUERY_KEY = ['getUserByName'];

export function useGetUserByNameQueryKey(params?: UseGetUserByNameParams) {
  return createQueryKey(QUERY_KEY, params);
}

export function useGetUserByName<TData = GetUserByNameResponse, TError = unknown>(
  client: Fetcher,
  args: UseGetUserByNameArgs<TData, TError>
) {
  return useFetcherQuery<GetUserByNameResponse, TError, TData, UseGetUserByNameParams>(client, {
    ...args,
    queryKey: QUERY_KEY,
    endpoint: getUserByName,
  });
}
