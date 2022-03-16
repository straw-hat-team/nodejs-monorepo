import type { UseMutationOptions } from 'react-query';
import type { Fetcher } from '@straw-hat/fetcher';
import type { AddPetResponse, AddPetParams } from '@my-sdk/pepeg';
import { useFetcherMutation } from '@straw-hat/react-query-fetcher';
import { addPet } from '@my-sdk/pepeg';

type UseAddPetVariables = Omit<AddPetParams, 'options'>;

type UseAddPetArgs<TError = unknown> = {
  options?: Omit<UseMutationOptions<AddPetResponse, TError, UseAddPetVariables>, 'mutationKey'>;
};

const MUTATION_KEY = 'addPet';

export function useAddPet<TError = unknown>(client: Fetcher, args: UseAddPetArgs<TError>) {
  const options = args.options ?? {};
  return useFetcherMutation<AddPetResponse, TError, UseAddPetVariables>(client, {
    options: {
      ...options,
      mutationKey: MUTATION_KEY,
    },
    endpoint: addPet,
  });
}
