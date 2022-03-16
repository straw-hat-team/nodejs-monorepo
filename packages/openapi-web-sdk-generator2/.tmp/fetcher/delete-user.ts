import type { Fetcher } from '@straw-hat/fetcher';
import { getResponseBody } from '@straw-hat/fetcher';
import { createUrlPath, OperationParams } from '@straw-hat/fetcher/dist/openapi';

export type DeleteUserPathParams = {
  /**
   * The name that needs to be deleted
   */
  username: string;
};

export type DeleteUserQueryParams = never;

export type DeleteUserBodyParams = never;

export type DeleteUserParams = Pick<
  OperationParams<DeleteUserPathParams, DeleteUserQueryParams, DeleteUserBodyParams>,
  'options' | 'path'
>;

export type DeleteUserResponse = unknown;

export function deleteUserUrlPath(params: Omit<DeleteUserParams, 'options'>) {
  return createUrlPath<DeleteUserPathParams, DeleteUserQueryParams>('/user/{username}', params);
}

export async function deleteUser(client: Fetcher, params: DeleteUserParams): Promise<DeleteUserResponse> {
  const url = deleteUserUrlPath(params);

  const response = await client(url, {
    method: 'DELETE',
    signal: params.options?.signal,
  });

  return getResponseBody(response);
}
