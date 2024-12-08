import { camelCase, constantCase, pascalCase, snakeCase } from 'change-case';
import {
  asString,
  getSchemaName,
  hasSchemaId,
  isOpenAPIV3SchemaObject,
  isReferenceObject,
  whenInject,
} from '../helpers.js';
import { OpenAPIV3NonArraySchemaObject, OpenAPIV3ReferenceableSchemaObject, OpenAPIV3SchemaObject } from '../types.js';
import { addTypeScripType, getTypeDefinition } from './add-typescript-type.js';
import { Scope } from './scope.js';

type EnumValueDefinition = {
  aliasName: string;
  varName: string;
  value: string;
  index: number;
};

async function objectType(scope: Scope, schema: OpenAPIV3NonArraySchemaObject) {
  if (!hasSchemaId(schema)) {
    return;
  }

  const schemaName = getSchemaName(schema);
  const camelCaseSchemaName = camelCase(schemaName);
  const schemaTypeRef = `schemas.${schemaName}`;

  for (const [propertyName, propertySchema] of Object.entries(schema.properties ?? {})) {
    if (!isOpenAPIV3SchemaObject(propertySchema)) {
      continue;
    }

    const isRequired = schema.required?.includes(propertyName) ?? false;
    const optional = isRequired ? '' : '?';
    const { type: schemaType = '' } = propertySchema;
    const pascalCasedPropertyName = pascalCase(propertyName);
    const getterFuncName = `get${schemaName}${pascalCasedPropertyName}`;

    scope.registerFunction({
      name: getterFuncName,
      args: [[camelCaseSchemaName, schemaTypeRef]],
      body: `return ${camelCaseSchemaName}['${propertyName}']`,
    });

    if (schemaType === 'boolean') {
      scope.registerFunction({
        name: `is${schemaName}${pascalCasedPropertyName}`,
        args: [[camelCaseSchemaName, schemaTypeRef]],
        body: `return ${getterFuncName}(${camelCaseSchemaName}) === true;`,
      });

      scope.registerFunction({
        name: `isNot${schemaName}${pascalCasedPropertyName}`,
        args: [[camelCaseSchemaName, schemaTypeRef]],
        body: `return ${getterFuncName}(${camelCaseSchemaName}) === false;`,
      });
    }

    if (['string', 'number', 'integer', 'boolean'].includes(schemaType)) {
      const targetType = schemaType === 'integer' ? 'number' : schemaType;
      scope.registerFunction({
        name: `isEqualTo${schemaName}${pascalCasedPropertyName}`,
        args: [
          [camelCaseSchemaName, schemaTypeRef],
          ['target', targetType],
        ],
        body: `return ${getterFuncName}(${camelCaseSchemaName}) === target`,
      });
    }

    if (schemaType === 'string') {
      if (propertySchema.enum) {
        const propertyDefinition = await addTypeScripType(scope, propertySchema);
        const enumDefinition = getTypeDefinition(propertyDefinition);
        const enumVariableName = constantCase(`${snakeCase(schemaName)}_${propertyName}`);
        const enumValueDef = propertySchema.enum.map(toEnumValueDef(propertySchema, enumVariableName));

        scope.registerFunction({
          name: `get${schemaName}${pascalCasedPropertyName}LowerCased`,
          args: [[camelCaseSchemaName, schemaTypeRef]],
          body: `return ${getterFuncName}(${camelCaseSchemaName})${optional}.toLowerCase()`,
        });

        scope.registerFunction({
          name: `get${schemaName}${pascalCasedPropertyName}UpperCased`,
          args: [[camelCaseSchemaName, schemaTypeRef]],
          body: `return ${getterFuncName}(${camelCaseSchemaName})${optional}.toUpperCase()`,
        });

        for (const def of enumValueDef) {
          const pascalCasedEnumValue = pascalCase(def.aliasName);

          scope.registerVariable({ name: def.varName, value: def.value });

          scope.registerFunction({
            name: `is${schemaName}${pascalCasedPropertyName}${pascalCasedEnumValue}`,
            args: [['value', enumDefinition]],
            body: `return value === ${def.varName}`,
          });

          scope.registerFunction({
            name: `isNot${schemaName}${pascalCasedPropertyName}${pascalCasedEnumValue}`,
            args: [['value', enumDefinition]],
            body: `return value !== ${def.varName};`,
          });

          scope.registerFunction({
            name: `is${schemaName}With${pascalCasedPropertyName}${pascalCasedEnumValue}`,
            args: [[camelCaseSchemaName, schemaTypeRef]],
            body: `return ${getterFuncName}(${camelCaseSchemaName}) === ${def.varName};`,
          });

          scope.registerFunction({
            name: `isNot${schemaName}With${pascalCasedPropertyName}${pascalCasedEnumValue}`,
            args: [[camelCaseSchemaName, schemaTypeRef]],
            body: `return ${getterFuncName}(${camelCaseSchemaName}) !== ${def.varName};`,
          });
        }

        scope.registerVariable({
          name: enumVariableName,
          value: `[${enumValueDef.map((def) => def.varName).join(',')}]`,
        });

        scope.registerFunction({
          name: `is${schemaName}${pascalCasedPropertyName}`,
          args: [['value', 'string']],
          body: `return ${enumVariableName}.includes(value);`,
        });
      } else {
        scope.registerFunction({
          name: `get${schemaName}${pascalCasedPropertyName}Length`,
          args: [[camelCaseSchemaName, schemaTypeRef]],
          body: `
            const value = ${getterFuncName}(${camelCaseSchemaName});
            ${whenInject(!isRequired, `if (value === undefined) { return undefined; }`)}
            return getLength(value)
          `,
        });

        scope.registerFunction({
          name: `is${schemaName}${pascalCasedPropertyName}Empty`,
          args: [[camelCaseSchemaName, schemaTypeRef]],
          body: `
            const value = get${schemaName}${pascalCasedPropertyName}Length(${camelCaseSchemaName});
            ${whenInject(!isRequired, `if (value === undefined) { return undefined; }`)}
            return isZero(value)
          `,
        });
      }
    }
  }
}

export async function addSchemaHelpers(scope: Scope, schema: OpenAPIV3ReferenceableSchemaObject) {
  if (isReferenceObject(schema)) {
    return;
  }

  scope.addImport('schemas', 'schemas');

  scope.registerFunction({
    private: true,
    name: `getLength`,
    args: [['value', 'string']],
    body: `return value.length;`,
  });

  scope.registerFunction({
    private: true,
    name: `isZero`,
    args: [['value', 'number']],
    body: `return value === 0;`,
  });

  switch (schema.type) {
    case 'object': {
      return objectType(scope, schema);
    }
  }
}

function toEnumValueDef(propertySchema: OpenAPIV3SchemaObject, enumVariableName: string) {
  return (value: string, index: number): EnumValueDefinition => {
    const enumValueName = propertySchema['x-enum-aliases']?.[value] ?? index.toString();

    return {
      varName: `${enumVariableName}_${enumValueName.toUpperCase()}`,
      aliasName: enumValueName,
      index,
      value: asString(value),
    };
  };
}
