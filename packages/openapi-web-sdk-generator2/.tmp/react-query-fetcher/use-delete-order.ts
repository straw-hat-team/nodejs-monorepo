import type { UseMutationOptions } from 'react-query';
import type { Fetcher } from '@straw-hat/fetcher';
import type { DeleteOrderResponse, DeleteOrderParams } from '@my-sdk/pepeg';
import { useFetcherMutation } from '@straw-hat/react-query-fetcher';
import { deleteOrder } from '@my-sdk/pepeg';

type UseDeleteOrderVariables = Omit<DeleteOrderParams, 'options'>;

type UseDeleteOrderArgs<TError = unknown> = {
  options?: Omit<UseMutationOptions<DeleteOrderResponse, TError, UseDeleteOrderVariables>, 'mutationKey'>;
};

const MUTATION_KEY = 'deleteOrder';

export function useDeleteOrder<TError = unknown>(client: Fetcher, args: UseDeleteOrderArgs<TError>) {
  const options = args.options ?? {};
  return useFetcherMutation<DeleteOrderResponse, TError, UseDeleteOrderVariables>(client, {
    options: {
      ...options,
      mutationKey: MUTATION_KEY,
    },
    endpoint: deleteOrder,
  });
}
