import { OpenAPIV3 } from 'openapi-types';
import { asString, getSchemaName, hasSchemaId, isReferenceObject } from '../helpers';
import { OpenAPIV3NonArraySchemaObject, OpenAPIV3ReferenceableSchemaObject } from '../types';
import { Scope, TypeDefinition } from './scope';

export function getTypeDefinition(type: TypeDefinition) {
  return type.name ?? type.definition;
}

// TODO: handle nullable
// TODO: handle example

function createDocs(schema: OpenAPIV3.SchemaObject) {
  const docs = [];

  if (schema.title) {
    docs.push(`* ${schema.title}`);
  }

  if (schema.description) {
    docs.push(`* ${schema.description}`);
  }

  if (schema.externalDocs) {
    docs.push(`* ${schema.externalDocs.description}: ${schema.externalDocs.url}`);
  }

  if (schema.deprecated) {
    docs.push('* @deprecated');
  }

  if (schema.default) {
    docs.push(`* @default ${schema.default}`);
  }

  if (schema.format) {
    docs.push(`* @format ${schema.format}`);
  }

  if (schema.readOnly) {
    docs.push('* @readonly');
  }

  if (schema.writeOnly) {
    docs.push('* @writeonly');
  }

  if (schema.multipleOf) {
    docs.push(`* @multipleOf ${schema.multipleOf}`);
  }

  if (schema.maximum) {
    docs.push(`* @maximum ${schema.maximum}`);
  }

  if (schema.exclusiveMaximum) {
    docs.push(`* @exclusiveMaximum ${schema.exclusiveMaximum}`);
  }

  if (schema.minimum) {
    docs.push(`* @minimum ${schema.minimum}`);
  }

  if (schema.exclusiveMinimum) {
    docs.push(`* @exclusiveMinimum ${schema.exclusiveMinimum}`);
  }

  if (schema.maxLength) {
    docs.push(`* @maxLength ${schema.maxLength}`);
  }

  if (schema.minLength) {
    docs.push(`* @minLength ${schema.minLength}`);
  }

  if (schema.pattern) {
    docs.push(`* @pattern ${schema.pattern}`);
  }

  if (schema.maxItems) {
    docs.push(`* @maxItems ${schema.maxItems}`);
  }

  if (schema.minItems) {
    docs.push(`* @minItems ${schema.minItems}`);
  }

  if (schema.uniqueItems) {
    docs.push(`* @uniqueItems ${schema.uniqueItems}`);
  }

  if (schema.maxProperties) {
    docs.push(`* @maxProperties ${schema.maxProperties}`);
  }

  if (schema.minProperties) {
    docs.push(`* @minProperties ${schema.minProperties}`);
  }

  if (docs.length === 0) {
    return undefined;
  }

  return ['/**', ...docs, '*/'].join('\n');
}

async function objectType(scope: Scope, schema: OpenAPIV3NonArraySchemaObject): Promise<TypeDefinition> {
  const definition: string[] = ['{'];

  // TODO: handle additionalProperties key

  if ('properties' in schema) {
    const tasks = Object.entries<OpenAPIV3ReferenceableSchemaObject>(schema.properties ?? {}).map(
      async ([propName, propSchema]) => {
        const propertyDefinition = await addTypeScripType(scope, propSchema);
        const optionalFlag = schema.required?.includes(propName) ? '' : '?';
        return [
          propertyDefinition.docs ?? '',
          `${propName}${optionalFlag}: ${getTypeDefinition(propertyDefinition)}`,
        ].join('\n');
      }
    );
    const properties = await Promise.all(tasks);

    definition.push(properties.join(';\n'));
  }

  definition.push('}');

  return scope.maybeRegisterType(schema, {
    name: undefined,
    definition: definition.join('\n'),
    docs: createDocs(schema),
  });
}

function stringType(scope: Scope, schema: OpenAPIV3.NonArraySchemaObject): TypeDefinition {
  const definition = schema.enum === undefined ? 'string' : schema.enum.map(asString).join('|');
  return scope.maybeRegisterType(schema, {
    name: undefined,
    definition: definition,
    docs: createDocs(schema),
  });
}

function booleanType(scope: Scope, schema: OpenAPIV3.NonArraySchemaObject): TypeDefinition {
  return scope.maybeRegisterType(schema, {
    name: undefined,
    definition: 'boolean',
    docs: createDocs(schema),
  });
}

function numberType(scope: Scope, schema: OpenAPIV3.NonArraySchemaObject) {
  return scope.maybeRegisterType(schema, {
    name: undefined,
    definition: 'number',
    docs: createDocs(schema),
  });
}

function integerType(scope: Scope, schema: OpenAPIV3.NonArraySchemaObject) {
  return numberType(scope, schema);
}

function unknownType(scope: Scope, schema: OpenAPIV3.NonArraySchemaObject) {
  return scope.maybeRegisterType(schema, {
    name: undefined,
    docs: createDocs(schema),
    definition: 'unknown',
  });
}

async function allOfType(scope: Scope, schemas: OpenAPIV3ReferenceableSchemaObject[]): Promise<TypeDefinition> {
  const tasks = schemas.map(async (schema) => getTypeDefinition(await addTypeScripType(scope, schema)));
  const typeDefinitions = await Promise.all(tasks);

  return {
    name: undefined,
    // TODO: handle Ref returns
    definition: typeDefinitions.join(' & '),
  };
}

async function oneOfType(scope: Scope, schemas: OpenAPIV3ReferenceableSchemaObject[]): Promise<TypeDefinition> {
  const tasks = schemas.map(async (schema) => getTypeDefinition(await addTypeScripType(scope, schema)));
  const typeDefinitions = await Promise.all(tasks);

  return {
    name: undefined,
    // TODO: handle Ref returns
    definition: typeDefinitions.join(' | '),
  };
}

async function anyOf(scope: Scope, schemas: OpenAPIV3ReferenceableSchemaObject[]): Promise<TypeDefinition> {
  const tasks = schemas.map(async (schema) => getTypeDefinition(await addTypeScripType(scope, schema)));
  const typeDefinitions = await Promise.all(tasks);

  return {
    name: undefined,
    definition: typeDefinitions.join(' | '),
  };
}

async function arrayType(scope: Scope, schema: OpenAPIV3.ArraySchemaObject): Promise<TypeDefinition> {
  const typeDefinition = await addTypeScripType(scope, schema.items);

  return {
    name: undefined,
    docs: createDocs(schema),
    // TODO: handle Ref returns
    definition: `Array<${getTypeDefinition(typeDefinition)}>`,
  };
}

async function referenceType(scope: Scope, schema: OpenAPIV3.ReferenceObject): Promise<TypeDefinition> {
  const resolvedSchema = await scope.resolveSchema(schema.$ref);

  scope.addImport(resolvedSchema.importPath, resolvedSchema.moduleName);

  if (!hasSchemaId(resolvedSchema.schema)) {
    throw new Error(`Missing x-schema-id for ${resolvedSchema.schema} under ${resolvedSchema.importPath}`);
  }

  return {
    name: undefined,
    definition: `${resolvedSchema.moduleName}.${getSchemaName(resolvedSchema.schema)}`,
  };
}

export async function addTypeScripType(
  scope: Scope,
  schema: OpenAPIV3ReferenceableSchemaObject
): Promise<TypeDefinition> {
  if (isReferenceObject(schema)) {
    return referenceType(scope, schema);
  }

  if (schema.allOf) {
    return allOfType(scope, schema.allOf);
  }

  if (schema.oneOf) {
    return oneOfType(scope, schema.oneOf);
  }

  if (schema.anyOf) {
    return anyOf(scope, schema.anyOf);
  }

  switch (schema.type) {
    case 'array':
      return arrayType(scope, schema);
    case 'object': {
      return objectType(scope, schema);
    }
    case 'boolean': {
      return booleanType(scope, schema);
    }
    case 'number': {
      return numberType(scope, schema);
    }
    case 'string': {
      return stringType(scope, schema);
    }
    case 'integer': {
      return integerType(scope, schema);
    }
    default: {
      return unknownType(scope, schema);
    }
  }
}
