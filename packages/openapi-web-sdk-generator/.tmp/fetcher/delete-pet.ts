import type { Fetcher } from '@straw-hat/fetcher';
import { getResponseBody } from '@straw-hat/fetcher';
import { createUrlPath, OperationParams } from '@straw-hat/fetcher/dist/openapi';

export type DeletePetPathParams = {
  /**
   * Pet id to delete
   * @format int64
   */
  petId: number;
};

export type DeletePetQueryParams = never;

export type DeletePetBodyParams = never;

export type DeletePetParams = Pick<
  OperationParams<DeletePetPathParams, DeletePetQueryParams, DeletePetBodyParams>,
  'options' | 'path'
>;

export type DeletePetResponse = unknown;

export function deletePetUrlPath(params: Omit<DeletePetParams, 'options'>) {
  return createUrlPath<DeletePetPathParams, DeletePetQueryParams>('/pet/{petId}', params);
}

export async function deletePet(client: Fetcher, params: DeletePetParams): Promise<DeletePetResponse> {
  const url = deletePetUrlPath(params);

  const response = await client(url, {
    method: 'DELETE',
    signal: params.options?.signal,
  });

  return getResponseBody(response);
}
