import type { UseMutationOptions } from 'react-query';
import type { Fetcher } from '@straw-hat/fetcher';
import type { DeletePetResponse, DeletePetParams } from '@my-sdk/pepeg';
import { useFetcherMutation } from '@straw-hat/react-query-fetcher';
import { deletePet } from '@my-sdk/pepeg';

type UseDeletePetVariables = Omit<DeletePetParams, 'options'>;

type UseDeletePetArgs<TError = unknown> = {
  options?: Omit<UseMutationOptions<DeletePetResponse, TError, UseDeletePetVariables>, 'mutationKey'>;
};

const MUTATION_KEY = 'deletePet';

export function useDeletePet<TError = unknown>(client: Fetcher, args: UseDeletePetArgs<TError>) {
  const options = args.options ?? {};
  return useFetcherMutation<DeletePetResponse, TError, UseDeletePetVariables>(client, {
    options: {
      ...options,
      mutationKey: MUTATION_KEY,
    },
    endpoint: deletePet,
  });
}
