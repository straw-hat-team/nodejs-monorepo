import { FancyMap } from '@straw-hat/fancy-map/dist';
import { OpenAPIV3ReferenceableSchemaObject } from '../types';
import { getSchemaName, hasSchemaId } from '../helpers';

export type TypeName = string;

type ImportPath = string;

type SchemaResolver = (ref: string) => Promise<{
  schema: OpenAPIV3ReferenceableSchemaObject;
  importPath: string;
  moduleName: string;
}>;

export type InlineTypeDefinition = {
  name: undefined;
  definition: string;
  docs?: string;
};

export type NamedTypeDefinition = {
  name: TypeName;
  definition: string;
  docs?: string;
};

export type TypeDefinition = InlineTypeDefinition | NamedTypeDefinition;

class ScopeImports {
  #imports = new Map<ImportPath, TypeName>();

  addImport(importPath: ImportPath, moduleName: TypeName) {
    this.#imports.set(importPath, moduleName);
    return this;
  }

  toString() {
    return Array.from(this.#imports.entries())
      .map(([importPath, moduleName]) => {
        return `import * as ${moduleName} from './${importPath}';`;
      })
      .join('\n');
  }
}

class ScopeFunctions {
  #functions = new FancyMap<string, { private?: boolean; args: Array<string[]>; body: string }>();

  registerFunction(args: { private?: boolean; name: string; args: Array<string[]>; body: string }) {
    if (this.#functions.has(args.name)) {
      return;
    }
    this.#functions.set(args.name, { private: args.private, args: args.args, body: args.body });
    return this;
  }

  toString() {
    return Array.from(this.#functions.entries())
      .map(([name, definition]) => {
        const args = definition.args.map((arg) => arg.join(': ')).join(', ');
        const exporting = definition.private ? '' : 'export';
        return `
          ${exporting} function ${name}(${args}) {
            ${definition.body}
          }
        `;
      })
      .join('\n');
  }
}

class ScopeTypes {
  #types = new FancyMap<string, NamedTypeDefinition>();

  maybeRegisterType(schema: OpenAPIV3ReferenceableSchemaObject, type: InlineTypeDefinition): TypeDefinition {
    if (!hasSchemaId(schema)) {
      return type;
    }

    const name = getSchemaName(schema);

    return this.#types.getOrSetSync(name, (name) => ({
      ...type,
      name,
    }));
  }

  toString() {
    return Array.from(this.#types.values())
      .map((type) => {
        return [type.docs ?? '', `export type ${type.name} = ${type.definition}`].join('\n');
      })
      .join('\n\n');
  }
}

class ScopeVariables {
  #variables = new FancyMap<string, string>();

  registerVariable(args: { name: string; value: string }) {
    if (this.#variables.has(args.name)) {
      return;
    }
    this.#variables.set(args.name, args.value);
    return this;
  }

  toString() {
    return Array.from(this.#variables.entries())
      .map(([name, value]) => `export const ${name} = ${value};`)
      .join('\n');
  }
}

export class Scope {
  #imports = new ScopeImports();
  #types = new ScopeTypes();
  #variables = new ScopeVariables();
  #functions = new ScopeFunctions();

  resolveSchema: SchemaResolver;

  constructor(opts: { resolveSchema: SchemaResolver }) {
    this.resolveSchema = opts.resolveSchema;
  }

  addImport(importPath: ImportPath, moduleName: TypeName) {
    this.#imports.addImport(importPath, moduleName);
    return this;
  }

  registerVariable(args: { name: string; value: string }) {
    this.#variables.registerVariable(args);
    return this;
  }

  registerFunction(definition: { private?: boolean; name: string; args: Array<string[]>; body: string }) {
    this.#functions.registerFunction(definition);
    return this;
  }

  maybeRegisterType(schema: OpenAPIV3ReferenceableSchemaObject, type: InlineTypeDefinition): TypeDefinition {
    return this.#types.maybeRegisterType(schema, type);
  }

  toString() {
    return [
      this.#imports.toString(),
      this.#types.toString(),
      this.#variables.toString(),
      this.#functions.toString(),
    ].join('\n\n\n');
  }
}
