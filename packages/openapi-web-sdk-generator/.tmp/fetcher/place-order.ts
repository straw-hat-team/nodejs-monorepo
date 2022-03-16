import type { Fetcher } from '@straw-hat/fetcher';
import { getRequestBody, getResponseBody } from '@straw-hat/fetcher';
import { createUrlPath, OperationParams } from '@straw-hat/fetcher/dist/openapi';
import * as schemas from './components/schemas';

export type PlaceOrderPathParams = never;

export type PlaceOrderQueryParams = never;

export type PlaceOrderBodyParams = schemas.Order;

export type PlaceOrderParams = Pick<
  OperationParams<PlaceOrderPathParams, PlaceOrderQueryParams, PlaceOrderBodyParams>,
  'options' | 'body'
>;

export type PlaceOrderResponse = schemas.Order;

export function placeOrderUrlPath(params: Omit<PlaceOrderParams, 'options'>) {
  return createUrlPath<PlaceOrderPathParams, PlaceOrderQueryParams>('/store/order', params);
}

export async function placeOrder(client: Fetcher, params: PlaceOrderParams): Promise<PlaceOrderResponse> {
  const url = placeOrderUrlPath(params);

  const response = await client(url, {
    method: 'POST',
    body: getRequestBody(params.body),
    signal: params.options?.signal,
  });

  return getResponseBody(response);
}
