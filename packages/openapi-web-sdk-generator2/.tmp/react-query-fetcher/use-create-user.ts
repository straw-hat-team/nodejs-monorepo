import type { UseMutationOptions } from 'react-query';
import type { Fetcher } from '@straw-hat/fetcher';
import type { CreateUserResponse, CreateUserParams } from '@my-sdk/pepeg';
import { useFetcherMutation } from '@straw-hat/react-query-fetcher';
import { createUser } from '@my-sdk/pepeg';

type UseCreateUserVariables = Omit<CreateUserParams, 'options'>;

type UseCreateUserArgs<TError = unknown> = {
  options?: Omit<UseMutationOptions<CreateUserResponse, TError, UseCreateUserVariables>, 'mutationKey'>;
};

const MUTATION_KEY = 'createUser';

export function useCreateUser<TError = unknown>(client: Fetcher, args: UseCreateUserArgs<TError>) {
  const options = args.options ?? {};
  return useFetcherMutation<CreateUserResponse, TError, UseCreateUserVariables>(client, {
    options: {
      ...options,
      mutationKey: MUTATION_KEY,
    },
    endpoint: createUser,
  });
}
