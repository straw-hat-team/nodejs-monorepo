import type { UseMutationOptions } from 'react-query';
import type { Fetcher } from '@straw-hat/fetcher';
import type { DeleteUserResponse, DeleteUserParams } from '@my-sdk/pepeg';
import { useFetcherMutation } from '@straw-hat/react-query-fetcher';
import { deleteUser } from '@my-sdk/pepeg';

type UseDeleteUserVariables = Omit<DeleteUserParams, 'options'>;

type UseDeleteUserArgs<TError = unknown> = {
  options?: Omit<UseMutationOptions<DeleteUserResponse, TError, UseDeleteUserVariables>, 'mutationKey'>;
};

const MUTATION_KEY = 'deleteUser';

export function useDeleteUser<TError = unknown>(client: Fetcher, args: UseDeleteUserArgs<TError>) {
  const options = args.options ?? {};
  return useFetcherMutation<DeleteUserResponse, TError, UseDeleteUserVariables>(client, {
    options: {
      ...options,
      mutationKey: MUTATION_KEY,
    },
    endpoint: deleteUser,
  });
}
