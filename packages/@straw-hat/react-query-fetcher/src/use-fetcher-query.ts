import { Fetcher } from '@straw-hat/fetcher';
import { UseQueryOptions, useQuery, QueryKey } from '@tanstack/react-query';
import { Endpoint } from './types.js';

type Options<TQueryFnData, TError, TData> = Omit<UseQueryOptions<TQueryFnData, TError, TData>, 'queryKey' | 'queryFn'>;

export type UseFetcherQueryArgs<TQueryFnData, TError, TData, TParams> = {
  queryKey: QueryKey;
  endpoint: Endpoint<TQueryFnData, TParams>;
  params?: TParams;
  options?: Options<TQueryFnData, TError, TData>;
};

export function createQueryKey<TParams = unknown>(queryKey: QueryKey, params?: TParams): QueryKey {
  if (params) {
    return [...queryKey, params];
  }
  return queryKey;
}

export function useFetcherQuery<TQueryFnData = unknown, TError = unknown, TData = TQueryFnData, TParams = unknown>(
  client: Fetcher,
  args: UseFetcherQueryArgs<TQueryFnData, TError, TData, TParams>,
) {
  const queryKey = createQueryKey(args.queryKey, args.params);
  const params = args.params ?? {};

  return useQuery<TQueryFnData, TError, TData>({
    ...args.options,
    queryKey,
    queryFn(context: { signal?: AbortSignal }) {
      return args.endpoint(
        client,
        // @ts-ignore ¯\_(ツ)_/¯
        {
          ...params,
          options: { signal: context.signal },
        },
      );
    },
  });
}
