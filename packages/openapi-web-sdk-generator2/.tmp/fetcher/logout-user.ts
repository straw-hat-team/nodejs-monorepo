import type { Fetcher } from '@straw-hat/fetcher';
import { getResponseBody } from '@straw-hat/fetcher';
import { createUrlPath, OperationParams } from '@straw-hat/fetcher/dist/openapi';

export type LogoutUserPathParams = never;

export type LogoutUserQueryParams = never;

export type LogoutUserBodyParams = never;

export type LogoutUserParams = Pick<
  OperationParams<LogoutUserPathParams, LogoutUserQueryParams, LogoutUserBodyParams>,
  'options'
>;

export type LogoutUserResponse = unknown;

export function logoutUserUrlPath(params: Omit<LogoutUserParams, 'options'>) {
  return createUrlPath<LogoutUserPathParams, LogoutUserQueryParams>('/user/logout', params);
}

export async function logoutUser(client: Fetcher, params: LogoutUserParams): Promise<LogoutUserResponse> {
  const url = logoutUserUrlPath(params);

  const response = await client(url, {
    method: 'GET',
    signal: params.options?.signal,
  });

  return getResponseBody(response);
}
