import type { Fetcher } from '@straw-hat/fetcher';
import type { UseFetcherQueryArgs } from '@straw-hat/react-query-fetcher';
import type { GetPetByIdResponse, GetPetByIdParams } from '@my-sdk/pepeg';
import { createQueryKey, useFetcherQuery } from '@straw-hat/react-query-fetcher';
import { getPetById } from '@my-sdk/pepeg';

type UseGetPetByIdParams = Omit<GetPetByIdParams, 'options'>;

type UseGetPetByIdArgs<TData, TError> = Omit<
  UseFetcherQueryArgs<GetPetByIdResponse, TError, TData, UseGetPetByIdParams>,
  'queryKey' | 'endpoint'
>;

const QUERY_KEY = ['getPetById'];

export function useGetPetByIdQueryKey(params?: UseGetPetByIdParams) {
  return createQueryKey(QUERY_KEY, params);
}

export function useGetPetById<TData = GetPetByIdResponse, TError = unknown>(
  client: Fetcher,
  args: UseGetPetByIdArgs<TData, TError>
) {
  return useFetcherQuery<GetPetByIdResponse, TError, TData, UseGetPetByIdParams>(client, {
    ...args,
    queryKey: QUERY_KEY,
    endpoint: getPetById,
  });
}
