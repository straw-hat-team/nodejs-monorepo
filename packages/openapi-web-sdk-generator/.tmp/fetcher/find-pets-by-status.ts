import type { Fetcher } from '@straw-hat/fetcher';
import { getResponseBody } from '@straw-hat/fetcher';
import { createUrlPath, OperationParams } from '@straw-hat/fetcher/dist/openapi';
import * as schemas from './components/schemas';

export type FindPetsByStatusPathParams = never;

export type FindPetsByStatusQueryParams = {
  /**
   * Status values that need to be considered for filter
   * @default available
   */
  status?: 'available' | 'pending' | 'sold';
};

export type FindPetsByStatusBodyParams = never;

export type FindPetsByStatusParams = Pick<
  OperationParams<FindPetsByStatusPathParams, FindPetsByStatusQueryParams, FindPetsByStatusBodyParams>,
  'options' | 'query'
>;

export type FindPetsByStatusResponse = Array<schemas.Pet>;

export function findPetsByStatusUrlPath(params: Omit<FindPetsByStatusParams, 'options'>) {
  return createUrlPath<FindPetsByStatusPathParams, FindPetsByStatusQueryParams>('/pet/findByStatus', params);
}

export async function findPetsByStatus(
  client: Fetcher,
  params: FindPetsByStatusParams
): Promise<FindPetsByStatusResponse> {
  const url = findPetsByStatusUrlPath(params);

  const response = await client(url, {
    method: 'GET',
    signal: params.options?.signal,
  });

  return getResponseBody(response);
}
