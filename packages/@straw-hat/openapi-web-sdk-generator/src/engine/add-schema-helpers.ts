import { OpenAPIV3NonArraySchemaObject, OpenAPIV3ReferenceableSchemaObject } from '../types';
import { asString, getSchemaName, hasSchemaId, isOpenAPIV3SchemaObject, isReferenceObject } from '../helpers';
import { camelCase, constantCase, pascalCase, snakeCase } from 'change-case';
import { Scope } from './scope';
import { getTypeDefinition, addTypeScripType } from './add-typescript-type';

async function objectType(scope: Scope, schema: OpenAPIV3NonArraySchemaObject) {
  if (!hasSchemaId(schema)) {
    return;
  }

  const schemaName = getSchemaName(schema);
  const camelCaseSchemaName = camelCase(schemaName);

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
      args: [[camelCaseSchemaName, schemaName]],
      body: `return ${camelCaseSchemaName}['${propertyName}']`,
    });

    if (schemaType === 'boolean') {
      scope.registerFunction({
        name: `is${schemaName}${pascalCasedPropertyName}`,
        args: [[camelCaseSchemaName, schemaName]],
        body: `return ${getterFuncName}(${camelCaseSchemaName}) === true;`,
      });

      scope.registerFunction({
        name: `isNot${schemaName}${pascalCasedPropertyName}`,
        args: [[camelCaseSchemaName, schemaName]],
        body: `return ${getterFuncName}(${camelCaseSchemaName}) === false;`,
      });
    }

    if (['string', 'number', 'integer', 'boolean'].includes(schemaType)) {
      const targetType = schemaType === 'integer' ? 'number' : schemaType;
      scope.registerFunction({
        name: `isEqualTo${schemaName}${pascalCasedPropertyName}`,
        args: [
          [camelCaseSchemaName, schemaName],
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

        scope.registerVariable({
          name: enumVariableName,
          value: `[${propertySchema.enum.map(asString).join(',')}]`,
        });

        scope.registerFunction({
          name: `is${schemaName}${pascalCasedPropertyName}`,
          args: [['value', 'string']],
          body: `return ${enumVariableName}.includes(value);`,
        });

        scope.registerFunction({
          name: `get${schemaName}${pascalCasedPropertyName}LowerCased`,
          args: [[camelCaseSchemaName, schemaName]],
          body: `return ${getterFuncName}(${camelCaseSchemaName})${optional}.toLowerCase()`,
        });

        scope.registerFunction({
          name: `get${schemaName}${pascalCasedPropertyName}UpperCased`,
          args: [[camelCaseSchemaName, schemaName]],
          body: `return ${getterFuncName}(${camelCaseSchemaName})${optional}.toUpperCase()`,
        });

        for (const enumIndex in propertySchema.enum) {
          const enumValue = propertySchema.enum[enumIndex];
          const pascalCasedEnumValue = pascalCase(enumValue);

          scope.registerFunction({
            name: `is${schemaName}${pascalCasedPropertyName}${pascalCasedEnumValue}`,
            args: [['value', enumDefinition]],
            body: `return value === ${enumVariableName}[${enumIndex}];`,
          });

          scope.registerFunction({
            name: `isNot${schemaName}${pascalCasedPropertyName}${pascalCasedEnumValue}`,
            args: [['value', enumDefinition]],
            body: `return value !== ${enumVariableName}[${enumIndex}];`,
          });

          scope.registerFunction({
            name: `is${schemaName}With${pascalCasedPropertyName}${pascalCasedEnumValue}`,
            args: [[camelCaseSchemaName, schemaName]],
            body: `return ${getterFuncName}(${camelCaseSchemaName}) === ${enumVariableName}[${enumIndex}];`,
          });

          scope.registerFunction({
            name: `isNot${schemaName}With${pascalCasedPropertyName}${pascalCasedEnumValue}`,
            args: [[camelCaseSchemaName, schemaName]],
            body: `return ${getterFuncName}(${camelCaseSchemaName}) !== ${enumVariableName}[${enumIndex}];`,
          });
        }
      } else {
        scope.registerFunction({
          name: `get${schemaName}${pascalCasedPropertyName}Length`,
          args: [[camelCaseSchemaName, schemaName]],
          body: `
            const value = ${getterFuncName}(${camelCaseSchemaName});
            ${whenInject(!isRequired, `if (value === undefined) { return undefined; }`)}
            return getLength(value)
          `,
        });

        scope.registerFunction({
          name: `is${schemaName}${pascalCasedPropertyName}Empty`,
          args: [[camelCaseSchemaName, schemaName]],
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

function whenInject(condition: boolean, body: string) {
  return condition ? body : '';
}

export async function addSchemaHelpers(scope: Scope, schema: OpenAPIV3ReferenceableSchemaObject) {
  if (isReferenceObject(schema)) {
    return;
  }

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
