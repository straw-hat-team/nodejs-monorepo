import type { UseMutationOptions } from 'react-query';
import type { Fetcher } from '@straw-hat/fetcher';
import type { PlaceOrderResponse, PlaceOrderParams } from '@my-sdk/pepeg';
import { useFetcherMutation } from '@straw-hat/react-query-fetcher';
import { placeOrder } from '@my-sdk/pepeg';

type UsePlaceOrderVariables = Omit<PlaceOrderParams, 'options'>;

type UsePlaceOrderArgs<TError = unknown> = {
  options?: Omit<UseMutationOptions<PlaceOrderResponse, TError, UsePlaceOrderVariables>, 'mutationKey'>;
};

const MUTATION_KEY = 'placeOrder';

export function usePlaceOrder<TError = unknown>(client: Fetcher, args: UsePlaceOrderArgs<TError>) {
  const options = args.options ?? {};
  return useFetcherMutation<PlaceOrderResponse, TError, UsePlaceOrderVariables>(client, {
    options: {
      ...options,
      mutationKey: MUTATION_KEY,
    },
    endpoint: placeOrder,
  });
}
