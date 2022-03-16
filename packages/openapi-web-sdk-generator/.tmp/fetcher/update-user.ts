import type { Fetcher } from '@straw-hat/fetcher';
import { getRequestBody, getResponseBody } from '@straw-hat/fetcher';
import { createUrlPath, OperationParams } from '@straw-hat/fetcher/dist/openapi';
import * as schemas from './components/schemas';

export type UpdateUserPathParams = {
  /**
   * name that need to be deleted
   */
  username: string;
};

export type UpdateUserQueryParams = never;

export type UpdateUserBodyParams = schemas.User;

export type UpdateUserParams = Pick<
  OperationParams<UpdateUserPathParams, UpdateUserQueryParams, UpdateUserBodyParams>,
  'options' | 'body' | 'path'
>;

export type UpdateUserResponse = unknown;

export function updateUserUrlPath(params: Omit<UpdateUserParams, 'options'>) {
  return createUrlPath<UpdateUserPathParams, UpdateUserQueryParams>('/user/{username}', params);
}

export async function updateUser(client: Fetcher, params: UpdateUserParams): Promise<UpdateUserResponse> {
  const url = updateUserUrlPath(params);

  const response = await client(url, {
    method: 'PUT',
    body: getRequestBody(params.body),
    signal: params.options?.signal,
  });

  return getResponseBody(response);
}
