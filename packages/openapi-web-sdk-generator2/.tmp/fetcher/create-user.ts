import type { Fetcher } from '@straw-hat/fetcher';
import { getRequestBody, getResponseBody } from '@straw-hat/fetcher';
import { createUrlPath, OperationParams } from '@straw-hat/fetcher/dist/openapi';
import * as schemas from './components/schemas';

export type CreateUserPathParams = never;

export type CreateUserQueryParams = never;

export type CreateUserBodyParams = schemas.User;

export type CreateUserParams = Pick<
  OperationParams<CreateUserPathParams, CreateUserQueryParams, CreateUserBodyParams>,
  'options' | 'body'
>;

export type CreateUserResponse = unknown;

export function createUserUrlPath(params: Omit<CreateUserParams, 'options'>) {
  return createUrlPath<CreateUserPathParams, CreateUserQueryParams>('/user', params);
}

export async function createUser(client: Fetcher, params: CreateUserParams): Promise<CreateUserResponse> {
  const url = createUserUrlPath(params);

  const response = await client(url, {
    method: 'POST',
    body: getRequestBody(params.body),
    signal: params.options?.signal,
  });

  return getResponseBody(response);
}
