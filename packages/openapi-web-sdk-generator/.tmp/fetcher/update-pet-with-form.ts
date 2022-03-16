import type { Fetcher } from '@straw-hat/fetcher';
import { getResponseBody } from '@straw-hat/fetcher';
import { createUrlPath, OperationParams } from '@straw-hat/fetcher/dist/openapi';

export type UpdatePetWithFormPathParams = {
  /**
   * ID of pet that needs to be updated
   * @format int64
   */
  petId: number;
};

export type UpdatePetWithFormQueryParams = {
  /**
   * Name of pet that needs to be updated
   */
  name?: string;
  /**
   * Status of pet that needs to be updated
   */
  status?: string;
};

export type UpdatePetWithFormBodyParams = never;

export type UpdatePetWithFormParams = Pick<
  OperationParams<UpdatePetWithFormPathParams, UpdatePetWithFormQueryParams, UpdatePetWithFormBodyParams>,
  'options' | 'path' | 'query'
>;

export type UpdatePetWithFormResponse = unknown;

export function updatePetWithFormUrlPath(params: Omit<UpdatePetWithFormParams, 'options'>) {
  return createUrlPath<UpdatePetWithFormPathParams, UpdatePetWithFormQueryParams>('/pet/{petId}', params);
}

export async function updatePetWithForm(
  client: Fetcher,
  params: UpdatePetWithFormParams
): Promise<UpdatePetWithFormResponse> {
  const url = updatePetWithFormUrlPath(params);

  const response = await client(url, {
    method: 'POST',
    signal: params.options?.signal,
  });

  return getResponseBody(response);
}
