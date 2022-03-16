import type { Fetcher } from '@straw-hat/fetcher';
import { getResponseBody } from '@straw-hat/fetcher';
import { createUrlPath, OperationParams } from '@straw-hat/fetcher/dist/openapi';
import * as schemas from './components/schemas';

export type GetUserByNamePathParams = {
  /**
   * The name that needs to be fetched. Use user1 for testing.
   */
  username: string;
};

export type GetUserByNameQueryParams = never;

export type GetUserByNameBodyParams = never;

export type GetUserByNameParams = Pick<
  OperationParams<GetUserByNamePathParams, GetUserByNameQueryParams, GetUserByNameBodyParams>,
  'options' | 'path'
>;

export type GetUserByNameResponse = schemas.User;

export function getUserByNameUrlPath(params: Omit<GetUserByNameParams, 'options'>) {
  return createUrlPath<GetUserByNamePathParams, GetUserByNameQueryParams>('/user/{username}', params);
}

export async function getUserByName(client: Fetcher, params: GetUserByNameParams): Promise<GetUserByNameResponse> {
  const url = getUserByNameUrlPath(params);

  const response = await client(url, {
    method: 'GET',
    signal: params.options?.signal,
  });

  return getResponseBody(response);
}
