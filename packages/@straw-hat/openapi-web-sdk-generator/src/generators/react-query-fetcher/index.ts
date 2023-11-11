import { camelCase, pascalCase } from 'change-case';
import { OpenAPIV3 } from 'openapi-types';
import path from 'node:path';
import { CodegenBase } from '../../codegen-base.js';
import { forEachHttpOperation, getOperationDirectory, getOperationFileRelativePath } from '../../helpers.js';
import { OutputDir } from '../../output-dir.js';
import { OperationObject, PathItemObject } from '../../types.js';

function isQuery(operationMethod: string) {
  return OpenAPIV3.HttpMethods.GET.toUpperCase() == operationMethod.toUpperCase();
}

export interface ReactQueryFetcherCodegenOptions {
  outputDir: string;
  packageName: string;
}

export default class ReactQueryFetcherCodegen extends CodegenBase<ReactQueryFetcherCodegenOptions> {
  private readonly packageName: string;
  readonly #outputDir: OutputDir;

  constructor(opts: ReactQueryFetcherCodegenOptions) {
    super(opts);
    this.#outputDir = new OutputDir(this.options.outputDir);
    this.packageName = opts.packageName;
  }

  #processOperation = async (args: {
    operationMethod: string;
    operationPath: string;
    pathItem: PathItemObject;
    operation: OperationObject;
  }) => {
    const operationDirPath = getOperationDirectory(args.pathItem, args.operation);
    const operationFilePath = `use-${getOperationFileRelativePath(operationDirPath, args.operation)}`;
    const functionName = camelCase(args.operation.operationId);
    const typePrefix = pascalCase(args.operation.operationId);
    const pascalFunctionName = pascalCase(args.operation.operationId);
    const operationIndexImportPath = path.relative(
      this.#outputDir.resolveDir('index.ts'),
      this.#outputDir.resolve(operationFilePath)
    );

    await this.#outputDir.createDir(operationDirPath);

    const sourceCode = isQuery(args.operationMethod)
      ? `
          import type { Fetcher } from '@straw-hat/fetcher';
          import type { UseFetcherQueryArgs } from '@straw-hat/react-query-fetcher';
          import type { ${typePrefix}Response, ${typePrefix}Params } from '${this.packageName}';
          import { createQueryKey, useFetcherQuery } from '@straw-hat/react-query-fetcher';
          import { ${functionName} } from '${this.packageName}';

          export type Use${pascalFunctionName}Params = Omit<${typePrefix}Params, 'options'>;

          export type Use${pascalFunctionName}Args<TData, TError> = Omit<
            UseFetcherQueryArgs<${typePrefix}Response, TError, TData, Use${pascalFunctionName}Params>,
            'queryKey' | 'endpoint'
          >;

          const QUERY_KEY = ['${functionName}'] as const;

          export function use${pascalFunctionName}QueryKey(params?: Use${pascalFunctionName}Params) {
            return createQueryKey(QUERY_KEY, params);
          }

          export function use${pascalFunctionName}<TData = ${typePrefix}Response, TError = unknown>(
            client: Fetcher,
            args: Use${pascalFunctionName}Args<TData, TError>,
          ) {
            return useFetcherQuery<${typePrefix}Response, TError, TData, Use${pascalFunctionName}Params>(client, {
              ...args,
              queryKey: QUERY_KEY,
              endpoint: ${functionName},
            });
          }
        `
      : `
          import type { UseMutationOptions } from '@tanstack/react-query';
          import type { Fetcher } from '@straw-hat/fetcher';
          import type { ${typePrefix}Response, ${typePrefix}Params } from '${this.packageName}';
          import { useFetcherMutation } from '@straw-hat/react-query-fetcher';
          import { ${functionName} } from '${this.packageName}';

          export type Use${pascalFunctionName}Variables = Omit<${typePrefix}Params, 'options'>;

          export type Use${pascalFunctionName}Args<TError = unknown> = {
            options?: Omit<UseMutationOptions<${typePrefix}Response, TError, Use${pascalFunctionName}Variables>, 'mutationKey'>
          };

          const MUTATION_KEY = ['${functionName}'] as const;

          export function use${pascalFunctionName}<TError = unknown>(
            client: Fetcher,
            args: Use${pascalFunctionName}Args<TError>,
          ) {
            const options = args.options ?? {};
            return useFetcherMutation<${typePrefix}Response, TError, Use${pascalFunctionName}Variables>(client, {
              options: {
                ...options,
                mutationKey: MUTATION_KEY,
              },
              endpoint: ${functionName},
            });
          }
      `;

    await this.#outputDir.writeFile(`${operationFilePath}.ts`, sourceCode);
    await this.#outputDir.formatFile(`${operationFilePath}.ts`);
    await this.#outputDir.appendFile('index.ts', `export * from './${operationIndexImportPath}';`);
  };

  async generate() {
    await this.#outputDir.resetDir();
    await forEachHttpOperation(this.document, this.#processOperation);
    await this.#outputDir.formatFile('index.ts');
  }
}
