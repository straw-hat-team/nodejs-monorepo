import type { Fetcher } from '@straw-hat/fetcher';
import { getResponseBody } from '@straw-hat/fetcher';
import { createUrlPath, OperationParams } from '@straw-hat/fetcher/dist/openapi';
import * as schemas from './components/schemas';

export type GetPetByIdPathParams = {
  /**
   * ID of pet to return
   * @format int64
   */
  petId: number;
};

export type GetPetByIdQueryParams = never;

export type GetPetByIdBodyParams = never;

export type GetPetByIdParams = Pick<
  OperationParams<GetPetByIdPathParams, GetPetByIdQueryParams, GetPetByIdBodyParams>,
  'options' | 'path'
>;

export type GetPetByIdResponse = schemas.Pet;

export function getPetByIdUrlPath(params: Omit<GetPetByIdParams, 'options'>) {
  return createUrlPath<GetPetByIdPathParams, GetPetByIdQueryParams>('/pet/{petId}', params);
}

export async function getPetById(client: Fetcher, params: GetPetByIdParams): Promise<GetPetByIdResponse> {
  const url = getPetByIdUrlPath(params);

  const response = await client(url, {
    method: 'GET',
    signal: params.options?.signal,
  });

  return getResponseBody(response);
}
