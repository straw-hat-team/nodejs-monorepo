import type { Fetcher } from '@straw-hat/fetcher';
import { getResponseBody } from '@straw-hat/fetcher';
import { createUrlPath, OperationParams } from '@straw-hat/fetcher/dist/openapi';

export type GetInventoryPathParams = never;

export type GetInventoryQueryParams = never;

export type GetInventoryBodyParams = never;

export type GetInventoryParams = Pick<
  OperationParams<GetInventoryPathParams, GetInventoryQueryParams, GetInventoryBodyParams>,
  'options'
>;

export type GetInventoryResponse = {};

export function getInventoryUrlPath(params: Omit<GetInventoryParams, 'options'>) {
  return createUrlPath<GetInventoryPathParams, GetInventoryQueryParams>('/store/inventory', params);
}

export async function getInventory(client: Fetcher, params: GetInventoryParams): Promise<GetInventoryResponse> {
  const url = getInventoryUrlPath(params);

  const response = await client(url, {
    method: 'GET',
    signal: params.options?.signal,
  });

  return getResponseBody(response);
}
