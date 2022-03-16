import type { Fetcher } from '@straw-hat/fetcher';
import { getRequestBody, getResponseBody } from '@straw-hat/fetcher';
import { createUrlPath, OperationParams } from '@straw-hat/fetcher/dist/openapi';
import * as schemas from './components/schemas';

export type UploadFilePathParams = {
  /**
   * ID of pet to update
   * @format int64
   */
  petId: number;
};

export type UploadFileQueryParams = {
  /**
   * Additional Metadata
   */
  additionalMetadata?: string;
};

export type UploadFileBodyParams = unknown;

export type UploadFileParams = Pick<
  OperationParams<UploadFilePathParams, UploadFileQueryParams, UploadFileBodyParams>,
  'options' | 'body' | 'path' | 'query'
>;

export type UploadFileResponse = schemas.ApiResponse;

export function uploadFileUrlPath(params: Omit<UploadFileParams, 'options'>) {
  return createUrlPath<UploadFilePathParams, UploadFileQueryParams>('/pet/{petId}/uploadImage', params);
}

export async function uploadFile(client: Fetcher, params: UploadFileParams): Promise<UploadFileResponse> {
  const url = uploadFileUrlPath(params);

  const response = await client(url, {
    method: 'POST',
    body: getRequestBody(params.body),
    signal: params.options?.signal,
  });

  return getResponseBody(response);
}
