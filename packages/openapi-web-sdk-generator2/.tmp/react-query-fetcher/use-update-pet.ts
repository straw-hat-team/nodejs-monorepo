import type { UseMutationOptions } from 'react-query';
import type { Fetcher } from '@straw-hat/fetcher';
import type { UpdatePetResponse, UpdatePetParams } from '@my-sdk/pepeg';
import { useFetcherMutation } from '@straw-hat/react-query-fetcher';
import { updatePet } from '@my-sdk/pepeg';

type UseUpdatePetVariables = Omit<UpdatePetParams, 'options'>;

type UseUpdatePetArgs<TError = unknown> = {
  options?: Omit<UseMutationOptions<UpdatePetResponse, TError, UseUpdatePetVariables>, 'mutationKey'>;
};

const MUTATION_KEY = 'updatePet';

export function useUpdatePet<TError = unknown>(client: Fetcher, args: UseUpdatePetArgs<TError>) {
  const options = args.options ?? {};
  return useFetcherMutation<UpdatePetResponse, TError, UseUpdatePetVariables>(client, {
    options: {
      ...options,
      mutationKey: MUTATION_KEY,
    },
    endpoint: updatePet,
  });
}
