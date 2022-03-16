import type { Fetcher } from '@straw-hat/fetcher';
import { getResponseBody } from '@straw-hat/fetcher';
import { createUrlPath, OperationParams } from '@straw-hat/fetcher/dist/openapi';

export type LoginUserPathParams = never;

export type LoginUserQueryParams = {
  /**
   * The user name for login
   */
  username?: string;
  /**
   * The password for login in clear text
   */
  password?: string;
};

export type LoginUserBodyParams = never;

export type LoginUserParams = Pick<
  OperationParams<LoginUserPathParams, LoginUserQueryParams, LoginUserBodyParams>,
  'options' | 'query'
>;

export type LoginUserResponse = string;

export function loginUserUrlPath(params: Omit<LoginUserParams, 'options'>) {
  return createUrlPath<LoginUserPathParams, LoginUserQueryParams>('/user/login', params);
}

export async function loginUser(client: Fetcher, params: LoginUserParams): Promise<LoginUserResponse> {
  const url = loginUserUrlPath(params);

  const response = await client(url, {
    method: 'GET',
    signal: params.options?.signal,
  });

  return getResponseBody(response);
}
