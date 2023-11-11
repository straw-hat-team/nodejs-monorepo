// @ts-expect-error https://github.com/sheerlox/import-from-esm/issues/46
import importFrom from "import-from-esm";
import type { OpenAPIV3 } from 'openapi-types';
import { CodegenBase } from './codegen-base.js';
import { createDebugger } from './helpers.js';

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

  async loadGenerators() {
    const generators = this.#config.generators || [];

    for (const config of generators) {
      try {
        debug(`Loading Generator: ${config.path}`);
        const pkg: any = await importFrom(this.#context, config.path);
        const Generator = pkg.__esModule ? pkg.default : pkg;
        const generator = new Generator(config.config);
        this.#generators.add(generator)
      } catch (e: any) {
        throw new Error(`Failed to load configuration file ${config.path}.\n${e.message}`);
      }
    }
  }

  async generate() {
    for (const generator of Array.from(this.#generators)) {
      await generator.setDocument(this.#document).generate();
    }
  }
}
