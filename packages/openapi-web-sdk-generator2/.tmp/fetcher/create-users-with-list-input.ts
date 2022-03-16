import type { Fetcher } from '@straw-hat/fetcher';
import { getRequestBody, getResponseBody } from '@straw-hat/fetcher';
import { createUrlPath, OperationParams } from '@straw-hat/fetcher/dist/openapi';
import * as schemas from './components/schemas';

export type CreateUsersWithListInputPathParams = never;

export type CreateUsersWithListInputQueryParams = never;

export type CreateUsersWithListInputBodyParams = Array<schemas.User>;

export type CreateUsersWithListInputParams = Pick<
  OperationParams<
    CreateUsersWithListInputPathParams,
    CreateUsersWithListInputQueryParams,
    CreateUsersWithListInputBodyParams
  >,
  'options' | 'body'
>;

export type CreateUsersWithListInputResponse = schemas.User;

export function createUsersWithListInputUrlPath(params: Omit<CreateUsersWithListInputParams, 'options'>) {
  return createUrlPath<CreateUsersWithListInputPathParams, CreateUsersWithListInputQueryParams>(
    '/user/createWithList',
    params
  );
}

export async function createUsersWithListInput(
  client: Fetcher,
  params: CreateUsersWithListInputParams
): Promise<CreateUsersWithListInputResponse> {
  const url = createUsersWithListInputUrlPath(params);

  const response = await client(url, {
    method: 'POST',
    body: getRequestBody(params.body),
    signal: params.options?.signal,
  });

  return getResponseBody(response);
}
