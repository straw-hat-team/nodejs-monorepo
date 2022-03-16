import type { Fetcher } from '@straw-hat/fetcher';
import type { UseFetcherQueryArgs } from '@straw-hat/react-query-fetcher';
import type { LoginUserResponse, LoginUserParams } from '@my-sdk/pepeg';
import { createQueryKey, useFetcherQuery } from '@straw-hat/react-query-fetcher';
import { loginUser } from '@my-sdk/pepeg';

type UseLoginUserParams = Omit<LoginUserParams, 'options'>;

type UseLoginUserArgs<TData, TError> = Omit<
  UseFetcherQueryArgs<LoginUserResponse, TError, TData, UseLoginUserParams>,
  'queryKey' | 'endpoint'
>;

const QUERY_KEY = ['loginUser'];

export function useLoginUserQueryKey(params?: UseLoginUserParams) {
  return createQueryKey(QUERY_KEY, params);
}

export function useLoginUser<TData = LoginUserResponse, TError = unknown>(
  client: Fetcher,
  args: UseLoginUserArgs<TData, TError>
) {
  return useFetcherQuery<LoginUserResponse, TError, TData, UseLoginUserParams>(client, {
    ...args,
    queryKey: QUERY_KEY,
    endpoint: loginUser,
  });
}
