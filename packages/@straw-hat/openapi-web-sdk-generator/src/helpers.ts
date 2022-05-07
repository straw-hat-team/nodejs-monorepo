import { OpenAPIV3ReferenceableSchemaObject, OpenAPIV3SchemaObject, OperationObject, PathItemObject } from './types';
import { paramCase, pascalCase } from 'change-case';
import * as path from 'path';
import { OpenAPIV3 } from 'openapi-types';
import debugFactory from 'debug';
import { OperationIdMissingError } from './errors';
import { cosmiconfig } from 'cosmiconfig';
import { OpenApiWebSdkGeneratorConfiguration } from './openapi-web-sdk-generator';
import SwaggerParser from '@apidevtools/swagger-parser';
import prettier from 'prettier';
import prettierConfig from '@straw-hat/prettier-config';

const cosmiconfigExplorer = cosmiconfig('openapi-web-sdk-generator');
const debug = createDebugger('helpers');

export function createDebugger(...scope: string[]) {
  const namespace = ['@straw-hat/openapi-web-sdk-generator', ...scope].join(':');
  return debugFactory(namespace);
}

export async function formatCode(text: string, opts: { cwd: string }) {
  const options = await prettier.resolveConfig(opts.cwd);
  return prettier.format(text, {
    parser: 'typescript',
    ...(options ?? prettierConfig),
  });
}

export function hasOperationId(operation: OperationObject) {
  return Boolean(operation.operationId);
}

export function hasSchemaId(
  schema: OpenAPIV3ReferenceableSchemaObject
): schema is OpenAPIV3ReferenceableSchemaObject & { 'x-schema-id': string } {
  return Boolean(schema['x-schema-id']);
}

export function isOpenAPIV3SchemaObject(schema: OpenAPIV3ReferenceableSchemaObject): schema is OpenAPIV3SchemaObject {
  return !schema.hasOwnProperty('$ref');
}

export function getSchemaName(schema: OpenAPIV3ReferenceableSchemaObject & { 'x-schema-id': string }) {
  return pascalCase(schema['x-schema-id']);
}

export function normalizeFileName(fileName: string) {
  return paramCase(fileName).toLowerCase();
}

export function getOperationDirectory(pathItem: PathItemObject, operation: OperationObject) {
  const pathDirectories = pathItem['x-directories'] ?? [];
  const operationDirectories = operation['x-directories'] ?? [];
  const normalizedDirNames = pathDirectories.concat(operationDirectories).map(normalizeFileName);
  return path.join(...normalizedDirNames);
}

export function getOperationFileRelativePath(operationDirPath: string, operation: OperationObject) {
  const normalizedName = normalizeFileName(operation.operationId!);
  return path.join(operationDirPath, normalizeFileName(normalizedName));
}

export function readOpenApiFile(filePath: string): Promise<OpenAPIV3.Document> {
  return SwaggerParser.parse(filePath) as Promise<OpenAPIV3.Document>;
}

export async function loadConfig(): Promise<OpenApiWebSdkGeneratorConfiguration> {
  const result = await cosmiconfigExplorer.search();

  if (!result) {
    return {};
  }

  debug(`Configuration file ${result?.filepath} loaded`);
  return (result?.config as OpenApiWebSdkGeneratorConfiguration) ?? {};
}

export async function forEachHttpOperation(
  document: OpenAPIV3.Document,
  callback: (args: {
    operationMethod: string;
    operationPath: string;
    pathItem: PathItemObject;
    operation: OperationObject;
  }) => Promise<any>
) {
  for (const [operationPath, pathItem] of Object.entries<PathItemObject>(document.paths as any)) {
    for (const operationMethod of Object.values(OpenAPIV3.HttpMethods)) {
      const operation = pathItem[operationMethod];

      if (operation === undefined) {
        continue;
      }

      if (!hasOperationId(operation)) {
        throw new OperationIdMissingError(operationPath, operationMethod);
      }

      await callback({
        operationPath,
        operationMethod,
        pathItem,
        operation,
      });
    }
  }
}

export function isReferenceObject(obj: any): obj is OpenAPIV3.ReferenceObject {
  return '$ref' in obj;
}

export function asString(value: any) {
  return `"${value}"`;
}

export function whenInject(condition: boolean, content: string, otherwise: string = '') {
  return condition ? content : otherwise;
}
