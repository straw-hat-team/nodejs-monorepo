import { OpenAPIV3 } from 'openapi-types';

export abstract class CodegenBase<Options = unknown> {
  #document: OpenAPIV3.Document | undefined = undefined;
  options: Options;

  protected constructor(opts: Options) {
    this.options = opts;
  }

  get document(): OpenAPIV3.Document {
    return this.#document!;
  }

  setDocument(document: OpenAPIV3.Document) {
    this.#document = document;
    return this;
  }

  abstract generate(): Promise<void>;
}
