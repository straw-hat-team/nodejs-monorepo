import type { Fetcher } from '@straw-hat/fetcher';

export type QueryKey = readonly unknown[];

export type WithOptions<T = unknown> = T & {
  options?: {
    signal?: AbortSignal;
  };
};

export type Endpoint<TResponse, TParams> = (client: Fetcher, params: WithOptions<TParams>) => Promise<TResponse>;
