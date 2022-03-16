import type { Fetcher } from '@straw-hat/fetcher';
import type { UseFetcherQueryArgs } from '@straw-hat/react-query-fetcher';
import type { LogoutUserResponse, LogoutUserParams } from '@my-sdk/pepeg';
import { createQueryKey, useFetcherQuery } from '@straw-hat/react-query-fetcher';
import { logoutUser } from '@my-sdk/pepeg';

type UseLogoutUserParams = Omit<LogoutUserParams, 'options'>;

type UseLogoutUserArgs<TData, TError> = Omit<
  UseFetcherQueryArgs<LogoutUserResponse, TError, TData, UseLogoutUserParams>,
  'queryKey' | 'endpoint'
>;

const QUERY_KEY = ['logoutUser'];

export function useLogoutUserQueryKey(params?: UseLogoutUserParams) {
  return createQueryKey(QUERY_KEY, params);
}

export function useLogoutUser<TData = LogoutUserResponse, TError = unknown>(
  client: Fetcher,
  args: UseLogoutUserArgs<TData, TError>
) {
  return useFetcherQuery<LogoutUserResponse, TError, TData, UseLogoutUserParams>(client, {
    ...args,
    queryKey: QUERY_KEY,
    endpoint: logoutUser,
  });
}
