import type { Fetcher } from '@straw-hat/fetcher';
import { getResponseBody } from '@straw-hat/fetcher';
import { createUrlPath, OperationParams } from '@straw-hat/fetcher/dist/openapi';
import * as schemas from './components/schemas';

export type GetOrderByIdPathParams = {
  /**
   * ID of order that needs to be fetched
   * @format int64
   */
  orderId: number;
};

export type GetOrderByIdQueryParams = never;

export type GetOrderByIdBodyParams = never;

export type GetOrderByIdParams = Pick<
  OperationParams<GetOrderByIdPathParams, GetOrderByIdQueryParams, GetOrderByIdBodyParams>,
  'options' | 'path'
>;

export type GetOrderByIdResponse = schemas.Order;

export function getOrderByIdUrlPath(params: Omit<GetOrderByIdParams, 'options'>) {
  return createUrlPath<GetOrderByIdPathParams, GetOrderByIdQueryParams>('/store/order/{orderId}', params);
}

export async function getOrderById(client: Fetcher, params: GetOrderByIdParams): Promise<GetOrderByIdResponse> {
  const url = getOrderByIdUrlPath(params);

  const response = await client(url, {
    method: 'GET',
    signal: params.options?.signal,
  });

  return getResponseBody(response);
}
