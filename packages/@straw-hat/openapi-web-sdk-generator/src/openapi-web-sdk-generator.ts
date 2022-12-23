import importFrom from 'import-from';
import type { OpenAPIV3 } from 'openapi-types';
import { CodegenBase } from './codegen-base';
import { createDebugger } from './helpers';

const debug = createDebugger('open-api-web-sdk-generator');

type GeneratorConfiguration = {
  path: string;
  config?: any;
};

export interface OpenApiWebSdkGeneratorConfiguration {
  generators?: GeneratorConfiguration[];
}

export interface OpenApiWebSdkGeneratorArgs {
  context: string;
  document: OpenAPIV3.Document;
  config: OpenApiWebSdkGeneratorConfiguration;
}

export class OpenapiWebSdkGenerator {
  readonly #generators = new Set<CodegenBase>();
  readonly #document: OpenAPIV3.Document;
  readonly #context: string;
  readonly #config: OpenApiWebSdkGeneratorConfiguration;

  constructor(args: OpenApiWebSdkGeneratorArgs) {
    this.#document = args.document;
    this.#config = args.config;
    this.#context = args.context;
  }

  loadGenerators() {
    this.#config.generators
      ?.map((config: GeneratorConfiguration) => {
        try {
          debug(`Loading Generator: ${config.path}`);
          const pkg: any = importFrom(this.#context, config.path);
          const Generator = pkg.__esModule ? pkg.default : pkg;
          return new Generator(config.config);
        } catch (e: any) {
          throw new Error(`Failed to load configuration file ${config.path}.\n${e.message}`);
        }
      })
      .map((generator: CodegenBase) => this.#generators.add(generator));

    return this;
  }

  generate() {
    return Array.from(this.#generators).map((generator) => {
      generator.setDocument(this.#document);
      return generator.generate();
    });
  }
}
