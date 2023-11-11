import { Resolver } from '@stoplight/json-ref-resolver';
import { camelCase, pascalCase } from 'change-case';
import * as path from 'node:path';
import { CodegenBase } from '../../codegen-base.js';
import { addSchemaHelpers } from '../../engine/add-schema-helpers.js';
import { addTypeScripType, getTypeDefinition } from '../../engine/add-typescript-type.js';
import { Scope } from '../../engine/scope.js';
import {
  forEachHttpOperation,
  formatCode,
  getOperationDirectory,
  getOperationFileRelativePath,
  whenInject,
} from '../../helpers.js';
import { OutputDir } from '../../output-dir.js';
import { OpenAPIV3ReferenceableSchemaObject, OperationObject, PathItemObject } from '../../types.js';
import { NEVER_DEFINITION, UNKNOWN_DEFINITION } from './constants.js';
import { getParameterSchemaFor, getRequestBodySchema, getResponseSchema } from './helpers.js';

export interface FetcherCodegenOptions {
  outputDir: string;
}

export default class FetcherCodegen extends CodegenBase<FetcherCodegenOptions> {
  readonly #outputDir: OutputDir;
  readonly #resolver: Resolver;

  constructor(opts: FetcherCodegenOptions) {
    super(opts);
    this.#outputDir = new OutputDir(this.options.outputDir);
    this.#resolver = new Resolver();
  }

  #resolveSchema = (args: { relativeToFilePath: string }) => async (ref: string) => {
    const [components, module] = ref.replace('#/', '').split('/') as [string, string];

    const fromPath = this.#outputDir.resolve(components, module);
    const toPath = path.dirname(args.relativeToFilePath);
    const operationIndexImportPath = path.relative(toPath, fromPath);

    const resolved = await this.#resolver.resolve(this.document, {
      jsonPointer: ref,
    });

    return {
      schema: resolved.result,
      importPath: operationIndexImportPath,
      moduleName: camelCase(module),
    };
  };

  async #processSchemas() {
    const schemaFilePath = this.#outputDir.resolve('components/schemas.ts');
    const scope = new Scope({
      resolveSchema: this.#resolveSchema({
        relativeToFilePath: schemaFilePath,
      }),
    });
    const schemas: Record<string, OpenAPIV3ReferenceableSchemaObject> =
      (this.document.components?.schemas as any) ?? {};

    for (const schemaObject of Object.values(schemas)) {
      await addTypeScripType(scope, schemaObject);
      await addSchemaHelpers(scope, schemaObject);
    }

    const formatted = await formatCode(scope.toString());

    await this.#outputDir.writeFile('components/schemas.ts', formatted);
  }

  #processOperation = async (args: {
    operationMethod: string;
    operationPath: string;
    pathItem: PathItemObject;
    operation: OperationObject;
  }) => {
    const operationDirPath = getOperationDirectory(args.pathItem, args.operation);
    const operationFileRelativePath = getOperationFileRelativePath(operationDirPath, args.operation);
    const operationFilePath = this.#outputDir.resolve(`${operationFileRelativePath}.ts`);

    const operationIndexImportPath = path.relative(
      this.#outputDir.resolveDir('index.ts'),
      this.#outputDir.resolve(operationFileRelativePath)
    );

    const functionName = camelCase(args.operation.operationId);
    const typePrefix = pascalCase(args.operation.operationId);

    const scope = new Scope({
      resolveSchema: this.#resolveSchema({
        relativeToFilePath: operationFilePath,
      }),
    });

    const requestBodySchema = getRequestBodySchema({ operation: args.operation });
    const requestBodyType = requestBodySchema ? await addTypeScripType(scope, requestBodySchema) : NEVER_DEFINITION;

    const pathParamSchema = getParameterSchemaFor({
      pathItem: args.pathItem,
      operation: args.operation,
      inName: 'path',
    });
    const pathParamsType = pathParamSchema ? await addTypeScripType(scope, pathParamSchema) : NEVER_DEFINITION;

    const queryParamSchema = getParameterSchemaFor({
      pathItem: args.pathItem,
      operation: args.operation,
      inName: 'query',
    });
    const queryParamsType = queryParamSchema ? await addTypeScripType(scope, queryParamSchema) : NEVER_DEFINITION;

    const responseSchema = getResponseSchema(args.operation);
    const responseType = responseSchema ? await addTypeScripType(scope, responseSchema) : UNKNOWN_DEFINITION;

    const requiredParams = [
      '"options"',
      requestBodySchema && '"body"',
      pathParamSchema && '"path"',
      queryParamSchema && '"query"',
    ]
      .filter(Boolean)
      .join(' | ');

    await this.#outputDir.createDir(operationDirPath);

    await this.#outputDir.writeFile(
      operationFilePath,
      `
        import type { Fetcher } from '@straw-hat/fetcher';
        import {
          ${whenInject(Boolean(requestBodySchema), `getRequestBody,`)}
          getResponseBody,
        } from '@straw-hat/fetcher';
        import { createUrlPath, OperationParams } from '@straw-hat/fetcher/dist/openapi';
      `
    );

    await this.#outputDir.appendFile(operationFilePath, scope.toString());

    const output = `
      ${whenInject(
        Boolean(pathParamSchema),
        `export type ${typePrefix}PathParams = ${getTypeDefinition(pathParamsType)};`
      )}

      ${whenInject(
        Boolean(queryParamSchema),
        `export type ${typePrefix}QueryParams = ${getTypeDefinition(queryParamsType)};`
      )}

      ${whenInject(
        Boolean(requestBodySchema),
        `export type ${typePrefix}BodyParams = ${getTypeDefinition(requestBodyType)};`
      )}

      export type ${typePrefix}Params = Pick<
        OperationParams<
          ${whenInject(Boolean(pathParamSchema), `${typePrefix}PathParams,`, 'never,')}
          ${whenInject(Boolean(queryParamSchema), `${typePrefix}QueryParams,`, 'never,')}
          ${whenInject(Boolean(requestBodySchema), `${typePrefix}BodyParams`, 'never')}
        >,
        ${requiredParams}
      >

      export type ${typePrefix}Response = ${getTypeDefinition(responseType)};

      export function ${functionName}UrlPath(params: Omit<${typePrefix}Params, 'options'>) {
        return createUrlPath<
          ${whenInject(Boolean(pathParamSchema), `${typePrefix}PathParams,`, 'never,')}
          ${whenInject(Boolean(queryParamSchema), `${typePrefix}QueryParams,`, 'never,')}
        >('${args.operationPath}', params);
      }

      export async function ${functionName}(
        client: Fetcher,
        params: ${typePrefix}Params
      ): Promise<${typePrefix}Response> {
        const url = ${functionName}UrlPath(params);

        const response = await client(url, {
          method: '${args.operationMethod.toUpperCase()}',
          ${whenInject(Boolean(requestBodySchema), `body: getRequestBody(params.body),`)}
          signal: params.options?.signal,
        });

        return getResponseBody(response);
      }
    `;
    await this.#outputDir.appendFile(operationFilePath, output);

    await this.#outputDir.formatFile(operationFilePath);

    await this.#outputDir.appendFile('index.ts', `export * from './${operationIndexImportPath}';`);
  };

  async generate() {
    await this.#outputDir.resetDir();
    await this.#outputDir.createDir('components');
    await this.#processSchemas();
    await forEachHttpOperation(this.document, this.#processOperation);
    await this.#outputDir.formatFile('index.ts');
  }
}
