import type { UseMutationOptions } from 'react-query';
import type { Fetcher } from '@straw-hat/fetcher';
import type { UpdatePetWithFormResponse, UpdatePetWithFormParams } from '@my-sdk/pepeg';
import { useFetcherMutation } from '@straw-hat/react-query-fetcher';
import { updatePetWithForm } from '@my-sdk/pepeg';

type UseUpdatePetWithFormVariables = Omit<UpdatePetWithFormParams, 'options'>;

type UseUpdatePetWithFormArgs<TError = unknown> = {
  options?: Omit<UseMutationOptions<UpdatePetWithFormResponse, TError, UseUpdatePetWithFormVariables>, 'mutationKey'>;
};

const MUTATION_KEY = 'updatePetWithForm';

export function useUpdatePetWithForm<TError = unknown>(client: Fetcher, args: UseUpdatePetWithFormArgs<TError>) {
  const options = args.options ?? {};
  return useFetcherMutation<UpdatePetWithFormResponse, TError, UseUpdatePetWithFormVariables>(client, {
    options: {
      ...options,
      mutationKey: MUTATION_KEY,
    },
    endpoint: updatePetWithForm,
  });
}
