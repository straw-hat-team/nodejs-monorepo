import { OpenAPIV3 } from 'openapi-types';

export type Referenceable<T> = OpenAPIV3.ReferenceObject | T;

export type OperationObject = OpenAPIV3.OperationObject<{
  'x-directories'?: string[];
  operationId: string;
}>;

// Remove when the following PR is in production
// https://github.com/kogosoftwarellc/open-api/pull/748
export interface PathItemObject extends OpenAPIV3.PathItemObject<OperationObject> {
  'x-directories'?: string[];
}

export type PathItemParameters = Array<OpenAPIV3.ReferenceObject | OpenAPIV3.ParameterObject>;

export type OpenAPIV3NonArraySchemaObject = OpenAPIV3.NonArraySchemaObject & {
  'x-schema-id'?: string;
};

export type OpenAPIV3SchemaObject = Referenceable<OpenAPIV3.SchemaObject> & {
  'x-schema-id'?: string;
};

export type OpenAPIV3RequestBody = Referenceable<OpenAPIV3.RequestBodyObject>;
