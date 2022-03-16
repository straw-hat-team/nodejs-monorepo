import type { Fetcher } from '@straw-hat/fetcher';
import { getResponseBody } from '@straw-hat/fetcher';
import { createUrlPath, OperationParams } from '@straw-hat/fetcher/dist/openapi';
import * as schemas from './components/schemas';

export type FindPetsByTagsPathParams = never;

export type FindPetsByTagsQueryParams = {
  /**
   * Tags to filter by
   */
  tags?: Array<string>;
};

export type FindPetsByTagsBodyParams = never;

export type FindPetsByTagsParams = Pick<
  OperationParams<FindPetsByTagsPathParams, FindPetsByTagsQueryParams, FindPetsByTagsBodyParams>,
  'options' | 'query'
>;

export type FindPetsByTagsResponse = Array<schemas.Pet>;

export function findPetsByTagsUrlPath(params: Omit<FindPetsByTagsParams, 'options'>) {
  return createUrlPath<FindPetsByTagsPathParams, FindPetsByTagsQueryParams>('/pet/findByTags', params);
}

export async function findPetsByTags(client: Fetcher, params: FindPetsByTagsParams): Promise<FindPetsByTagsResponse> {
  const url = findPetsByTagsUrlPath(params);

  const response = await client(url, {
    method: 'GET',
    signal: params.options?.signal,
  });

  return getResponseBody(response);
}
