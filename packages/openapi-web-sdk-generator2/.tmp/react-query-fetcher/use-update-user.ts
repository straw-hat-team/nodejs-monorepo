import type { UseMutationOptions } from 'react-query';
import type { Fetcher } from '@straw-hat/fetcher';
import type { UpdateUserResponse, UpdateUserParams } from '@my-sdk/pepeg';
import { useFetcherMutation } from '@straw-hat/react-query-fetcher';
import { updateUser } from '@my-sdk/pepeg';

type UseUpdateUserVariables = Omit<UpdateUserParams, 'options'>;

type UseUpdateUserArgs<TError = unknown> = {
  options?: Omit<UseMutationOptions<UpdateUserResponse, TError, UseUpdateUserVariables>, 'mutationKey'>;
};

const MUTATION_KEY = 'updateUser';

export function useUpdateUser<TError = unknown>(client: Fetcher, args: UseUpdateUserArgs<TError>) {
  const options = args.options ?? {};
  return useFetcherMutation<UpdateUserResponse, TError, UseUpdateUserVariables>(client, {
    options: {
      ...options,
      mutationKey: MUTATION_KEY,
    },
    endpoint: updateUser,
  });
}
