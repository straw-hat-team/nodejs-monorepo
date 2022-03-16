import type { Fetcher } from '@straw-hat/fetcher';
import type { UseFetcherQueryArgs } from '@straw-hat/react-query-fetcher';
import type { FindPetsByStatusResponse, FindPetsByStatusParams } from '@my-sdk/pepeg';
import { createQueryKey, useFetcherQuery } from '@straw-hat/react-query-fetcher';
import { findPetsByStatus } from '@my-sdk/pepeg';

type UseFindPetsByStatusParams = Omit<FindPetsByStatusParams, 'options'>;

type UseFindPetsByStatusArgs<TData, TError> = Omit<
  UseFetcherQueryArgs<FindPetsByStatusResponse, TError, TData, UseFindPetsByStatusParams>,
  'queryKey' | 'endpoint'
>;

const QUERY_KEY = ['findPetsByStatus'];

export function useFindPetsByStatusQueryKey(params?: UseFindPetsByStatusParams) {
  return createQueryKey(QUERY_KEY, params);
}

export function useFindPetsByStatus<TData = FindPetsByStatusResponse, TError = unknown>(
  client: Fetcher,
  args: UseFindPetsByStatusArgs<TData, TError>
) {
  return useFetcherQuery<FindPetsByStatusResponse, TError, TData, UseFindPetsByStatusParams>(client, {
    ...args,
    queryKey: QUERY_KEY,
    endpoint: findPetsByStatus,
  });
}
