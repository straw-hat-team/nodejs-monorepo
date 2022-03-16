import type { Fetcher } from '@straw-hat/fetcher';
import { getResponseBody } from '@straw-hat/fetcher';
import { createUrlPath, OperationParams } from '@straw-hat/fetcher/dist/openapi';

export type DeleteOrderPathParams = {
  /**
   * ID of the order that needs to be deleted
   * @format int64
   */
  orderId: number;
};

export type DeleteOrderQueryParams = never;

export type DeleteOrderBodyParams = never;

export type DeleteOrderParams = Pick<
  OperationParams<DeleteOrderPathParams, DeleteOrderQueryParams, DeleteOrderBodyParams>,
  'options' | 'path'
>;

export type DeleteOrderResponse = unknown;

export function deleteOrderUrlPath(params: Omit<DeleteOrderParams, 'options'>) {
  return createUrlPath<DeleteOrderPathParams, DeleteOrderQueryParams>('/store/order/{orderId}', params);
}

export async function deleteOrder(client: Fetcher, params: DeleteOrderParams): Promise<DeleteOrderResponse> {
  const url = deleteOrderUrlPath(params);

  const response = await client(url, {
    method: 'DELETE',
    signal: params.options?.signal,
  });

  return getResponseBody(response);
}
