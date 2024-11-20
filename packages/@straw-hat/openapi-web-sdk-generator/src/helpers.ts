import SwaggerParser from '@apidevtools/swagger-parser';
import { kebabCase, pascalCase } from 'change-case';
import { cosmiconfig } from 'cosmiconfig';
import debugFactory from 'debug';
import * as path from 'node:path';
import { OpenAPIV3 } from 'openapi-types';
import * as prettier from 'prettier';
import { OperationIdMissingError } from './errors.js';
import { OpenApiWebSdkGeneratorConfiguration } from './openapi-web-sdk-generator.js';
import { OpenAPIV3ReferenceableSchemaObject, OpenAPIV3SchemaObject, OperationObject, PathItemObject } from './types.js';

const cosmiconfigExplorer = cosmiconfig('openapi-web-sdk-generator');
const debug = createDebugger('helpers');

export function createDebugger(...scope: string[]) {
  const namespace = ['@straw-hat/openapi-web-sdk-generator', ...scope].join(':');
  return debugFactory(namespace);
}

export async function formatCode(text: string) {
  return prettier.format(text, { parser: 'typescript' });
}

export function hasOperationId(operation: OperationObject) {
  return Boolean(operation.operationId);
}

export function hasSchemaId(
  schema: OpenAPIV3ReferenceableSchemaObject,
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
  return kebabCase(fileName).toLowerCase();
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
  }) => Promise<any>,
) {
  const paths = Object.entries<PathItemObject>(document.paths as any);
  const methods = Object.values(OpenAPIV3.HttpMethods) as string[];

  for (const [operationPath, pathItem] of paths) {
    for (const operationMethod of methods) {
      const operation = pathItem[operationMethod as keyof PathItemObject];

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
