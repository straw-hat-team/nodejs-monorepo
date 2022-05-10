import { forEachHttpOperation } from '../../helpers';
import { CodegenBase } from '../../codegen-base';
import { snakeCase } from 'change-case';
import { OperationObject, PathItemObject } from '../../types';
import { OutputDir } from '../../output-dir';

export interface ElixirTeslaCodegenOptions {
  outputDir: string;
}

export default class ElixirTeslaCodegen extends CodegenBase<ElixirTeslaCodegenOptions> {
  readonly #outputDir: OutputDir;

  constructor(opts: ElixirTeslaCodegenOptions) {
    super(opts);
    this.#outputDir = new OutputDir(this.options.outputDir);
  }

  #processOperation = async (args: {
    operationMethod: string;
    operationPath: string;
    pathItem: PathItemObject;
    operation: OperationObject;
  }) => {
    const functionName = snakeCase(args.operation.operationId);
    await this.#outputDir.appendFile(
      'api.ex',
      `
       def ${functionName}()
         :ok
       end
      `
    );
  };

  async generate() {
    await this.#outputDir.resetDir();
    await this.#outputDir.createDir('components');
    await this.#outputDir.writeFile('api.ex', '');
    await forEachHttpOperation(this.document, this.#processOperation);
  }
}
