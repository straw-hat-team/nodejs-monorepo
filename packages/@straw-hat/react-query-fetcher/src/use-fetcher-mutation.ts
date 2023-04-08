import type { Fetcher } from '@straw-hat/fetcher/dist';
import type { UseMutationOptions } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';
import type { Endpoint, WithOptions } from './types';

export type UseFetcherMutationArgs<TData, TError, TVariables> = {
  endpoint: Endpoint<TData, TVariables>;
  options?: UseMutationOptions<TData, TError, TVariables>;
};

export function useFetcherMutation<TData = unknown, TError = unknown, TVariables = void>(
  client: Fetcher,
  args: UseFetcherMutationArgs<TData, TError, TVariables>
) {
  return useMutation<TData, TError, WithOptions<TVariables>>(function (params) {
    return args.endpoint(client, params);
  }, args.options);
}
