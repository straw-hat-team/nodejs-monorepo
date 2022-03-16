import type { UseMutationOptions } from 'react-query';
import type { Fetcher } from '@straw-hat/fetcher';
import type { UploadFileResponse, UploadFileParams } from '@my-sdk/pepeg';
import { useFetcherMutation } from '@straw-hat/react-query-fetcher';
import { uploadFile } from '@my-sdk/pepeg';

type UseUploadFileVariables = Omit<UploadFileParams, 'options'>;

type UseUploadFileArgs<TError = unknown> = {
  options?: Omit<UseMutationOptions<UploadFileResponse, TError, UseUploadFileVariables>, 'mutationKey'>;
};

const MUTATION_KEY = 'uploadFile';

export function useUploadFile<TError = unknown>(client: Fetcher, args: UseUploadFileArgs<TError>) {
  const options = args.options ?? {};
  return useFetcherMutation<UploadFileResponse, TError, UseUploadFileVariables>(client, {
    options: {
      ...options,
      mutationKey: MUTATION_KEY,
    },
    endpoint: uploadFile,
  });
}
