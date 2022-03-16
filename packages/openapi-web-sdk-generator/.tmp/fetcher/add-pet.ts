import type { Fetcher } from '@straw-hat/fetcher';
import { getRequestBody, getResponseBody } from '@straw-hat/fetcher';
import { createUrlPath, OperationParams } from '@straw-hat/fetcher/dist/openapi';
import * as schemas from './components/schemas';

export type AddPetPathParams = never;

export type AddPetQueryParams = never;

export type AddPetBodyParams = schemas.Pet;

export type AddPetParams = Pick<
  OperationParams<AddPetPathParams, AddPetQueryParams, AddPetBodyParams>,
  'options' | 'body'
>;

export type AddPetResponse = schemas.Pet;

export function addPetUrlPath(params: Omit<AddPetParams, 'options'>) {
  return createUrlPath<AddPetPathParams, AddPetQueryParams>('/pet', params);
}

export async function addPet(client: Fetcher, params: AddPetParams): Promise<AddPetResponse> {
  const url = addPetUrlPath(params);

  const response = await client(url, {
    method: 'POST',
    body: getRequestBody(params.body),
    signal: params.options?.signal,
  });

  return getResponseBody(response);
}
