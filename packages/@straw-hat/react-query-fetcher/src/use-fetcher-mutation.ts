import { Fetcher } from '@straw-hat/fetcher';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { Endpoint, WithOptions } from './types.js';

type Options<TData, TError, TVariables> = Omit<UseMutationOptions<TData, TError, TVariables>, 'mutationFn'>;

export type UseFetcherMutationArgs<TData, TError, TVariables> = {
  endpoint: Endpoint<TData, TVariables>;
  options?: Options<TData, TError, TVariables>;
};

export function useFetcherMutation<TData = unknown, TError = unknown, TVariables = void>(
  client: Fetcher,
  args: UseFetcherMutationArgs<TData, TError, TVariables>,
) {
  return useMutation<TData, TError, WithOptions<TVariables>>({
    ...args.options,
    mutationFn(params) {
      return args.endpoint(client, params);
    },
  });
}
