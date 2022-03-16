import type { Fetcher } from '@straw-hat/fetcher';
import type { UseFetcherQueryArgs } from '@straw-hat/react-query-fetcher';
import type { FindPetsByTagsResponse, FindPetsByTagsParams } from '@my-sdk/pepeg';
import { createQueryKey, useFetcherQuery } from '@straw-hat/react-query-fetcher';
import { findPetsByTags } from '@my-sdk/pepeg';

type UseFindPetsByTagsParams = Omit<FindPetsByTagsParams, 'options'>;

type UseFindPetsByTagsArgs<TData, TError> = Omit<
  UseFetcherQueryArgs<FindPetsByTagsResponse, TError, TData, UseFindPetsByTagsParams>,
  'queryKey' | 'endpoint'
>;

const QUERY_KEY = ['findPetsByTags'];

export function useFindPetsByTagsQueryKey(params?: UseFindPetsByTagsParams) {
  return createQueryKey(QUERY_KEY, params);
}

export function useFindPetsByTags<TData = FindPetsByTagsResponse, TError = unknown>(
  client: Fetcher,
  args: UseFindPetsByTagsArgs<TData, TError>
) {
  return useFetcherQuery<FindPetsByTagsResponse, TError, TData, UseFindPetsByTagsParams>(client, {
    ...args,
    queryKey: QUERY_KEY,
    endpoint: findPetsByTags,
  });
}
