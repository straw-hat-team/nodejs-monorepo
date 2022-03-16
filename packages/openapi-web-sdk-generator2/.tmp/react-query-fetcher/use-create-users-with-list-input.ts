import type { UseMutationOptions } from 'react-query';
import type { Fetcher } from '@straw-hat/fetcher';
import type { CreateUsersWithListInputResponse, CreateUsersWithListInputParams } from '@my-sdk/pepeg';
import { useFetcherMutation } from '@straw-hat/react-query-fetcher';
import { createUsersWithListInput } from '@my-sdk/pepeg';

type UseCreateUsersWithListInputVariables = Omit<CreateUsersWithListInputParams, 'options'>;

type UseCreateUsersWithListInputArgs<TError = unknown> = {
  options?: Omit<
    UseMutationOptions<CreateUsersWithListInputResponse, TError, UseCreateUsersWithListInputVariables>,
    'mutationKey'
  >;
};

const MUTATION_KEY = 'createUsersWithListInput';

export function useCreateUsersWithListInput<TError = unknown>(
  client: Fetcher,
  args: UseCreateUsersWithListInputArgs<TError>
) {
  const options = args.options ?? {};
  return useFetcherMutation<CreateUsersWithListInputResponse, TError, UseCreateUsersWithListInputVariables>(client, {
    options: {
      ...options,
      mutationKey: MUTATION_KEY,
    },
    endpoint: createUsersWithListInput,
  });
}
