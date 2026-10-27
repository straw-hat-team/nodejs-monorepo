import { OpenAPIV3ReferenceableSchemaObject, OperationObject, PathItemObject, PathItemParameters } from '../../types';
import { OpenAPIV3 } from 'openapi-types';
import { isReferenceObject } from '../../helpers';

export function getResponseSchema(operation: OperationObject): OpenAPIV3ReferenceableSchemaObject | undefined {
  const schemas = Object.entries(operation.responses ?? {})
    .map(([status, response]) => {
      const statusCode = parseInt(status, 10);

      if (isNaN(statusCode) || statusCode < 200 || statusCode > 299) {
        return;
      }

      // @ts-ignore Handle $ref content
      return response.content?.['application/json'].schema;
    })
    .filter(Boolean);

  return schemas.length === 0
    ? undefined
    : {
        oneOf: schemas,
      };
}

export function getRequestBodySchema(args: {
  operation: OperationObject;
}): OpenAPIV3ReferenceableSchemaObject | undefined {
  if (!args.operation.requestBody) {
    return;
  }

  if (isReferenceObject(args.operation.requestBody)) {
    return args.operation.requestBody;
  }

  return {
    description: args.operation.requestBody.description,
    ...args.operation.requestBody.content?.['application/json']?.schema,
  };
}

export function getParameterSchemaFor(args: {
  pathItem: PathItemObject;
  operation: OperationObject;
  inName: 'path' | 'query';
}): OpenAPIV3.NonArraySchemaObject | undefined {
  const pathParameters = ([] as PathItemParameters)
    .concat(args.pathItem.parameters ?? [])
    .concat(args.operation.parameters ?? [])
    .filter((parameter) => {
      // @ts-ignore Handle $ref
      return parameter.in === args.inName;
    });

  if (pathParameters.length === 0) {
    return;
  }

  return pathParameters.reduce(
    (schema, parameter) => {
      // TODO: Follow up. Technically parameters are never a $ref based on the spec.
      const param = parameter as OpenAPIV3.ParameterObject;

      if (param.required) {
        schema.required!.push(param.name);
      }

      schema.properties[param.name] = {
        description: param.description,
        ...param.schema,
      };

      return schema;
    },
    {
      type: 'object',
      properties: {},
      required: [],
    } as Required<Pick<OpenAPIV3.NonArraySchemaObject, 'type' | 'properties' | 'required'>>
  );
}
