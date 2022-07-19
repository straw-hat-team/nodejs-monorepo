import type { UseMutationOptions } from '@tanstack/react-query';
import type { Fetcher } from '@straw-hat/fetcher/dist';
import type { Endpoint } from './types';
import { useMutation } from '@tanstack/react-query';

export type UseFetcherMutationArgs<TData, TError, TVariables> = {
  endpoint: Endpoint<TData, TVariables>;
  options?: UseMutationOptions<TData, TError, TVariables>;
};

export function useFetcherMutation<TData = unknown, TError = unknown, TVariables = void>(
  client: Fetcher,
  args: UseFetcherMutationArgs<TData, TError, TVariables>
) {
  return useMutation<TData, TError, TVariables>(function (params: TVariables) {
    return args.endpoint(client, params);
  }, args.options);
}
