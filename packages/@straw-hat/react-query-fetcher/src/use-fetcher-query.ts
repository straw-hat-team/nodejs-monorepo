import type { UseQueryOptions } from '@tanstack/react-query';
import type { Fetcher } from '@straw-hat/fetcher/dist';
import type { QueryKey, Endpoint } from './types';
import { useQuery } from '@tanstack/react-query';

export type UseFetcherQueryArgs<TQueryFnData, TError, TData, TParams> = {
  queryKey: QueryKey;
  endpoint: Endpoint<TQueryFnData, TParams>;
  params?: TParams;
  options?: UseQueryOptions<TQueryFnData, TError, TData>;
};

export function createQueryKey<TParams = unknown>(queryKey: QueryKey, params?: TParams): QueryKey {
  if (params) {
    return [...queryKey, params];
  }
  return queryKey;
}

export function useFetcherQuery<TQueryFnData = unknown, TError = unknown, TData = TQueryFnData, TParams = unknown>(
  client: Fetcher,
  args: UseFetcherQueryArgs<TQueryFnData, TError, TData, TParams>
) {
  const queryKey = createQueryKey(args.queryKey, args.params);
  const params = args.params ?? {};

  return useQuery<TQueryFnData, TError, TData>(
    queryKey,
    function queryFn(context: { signal?: AbortSignal }) {
      return args.endpoint(
        client,
        // @ts-ignore ¯\_(ツ)_/¯
        {
          ...params,
          options: { signal: context.signal },
        }
      );
    },
    args.options
  );
}
