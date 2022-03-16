import type { Fetcher } from '@straw-hat/fetcher';
import { getRequestBody, getResponseBody } from '@straw-hat/fetcher';
import { createUrlPath, OperationParams } from '@straw-hat/fetcher/dist/openapi';
import * as schemas from './components/schemas';

export type UpdatePetPathParams = never;

export type UpdatePetQueryParams = never;

export type UpdatePetBodyParams = schemas.Pet;

export type UpdatePetParams = Pick<
  OperationParams<UpdatePetPathParams, UpdatePetQueryParams, UpdatePetBodyParams>,
  'options' | 'body'
>;

export type UpdatePetResponse = schemas.Pet;

export function updatePetUrlPath(params: Omit<UpdatePetParams, 'options'>) {
  return createUrlPath<UpdatePetPathParams, UpdatePetQueryParams>('/pet', params);
}

export async function updatePet(client: Fetcher, params: UpdatePetParams): Promise<UpdatePetResponse> {
  const url = updatePetUrlPath(params);

  const response = await client(url, {
    method: 'PUT',
    body: getRequestBody(params.body),
    signal: params.options?.signal,
  });

  return getResponseBody(response);
}
