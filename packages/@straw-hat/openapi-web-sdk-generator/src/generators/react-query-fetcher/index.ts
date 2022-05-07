import { CodegenBase } from '../../codegen-base';
import { OperationObject, PathItemObject } from '../../types';
import { forEachHttpOperation, getOperationDirectory, getOperationFileRelativePath } from '../../helpers';
import path from 'path';
import { OutputDir } from '../../output-dir';
import { TemplateDir } from '../../template-dir';
import { camelCase, pascalCase } from 'change-case';
import { OpenAPIV3 } from 'openapi-types';

const templateDir = new TemplateDir(
  path.join(__dirname, '..', '..', '..', 'templates', 'generators', 'react-query-fetcher')
);

function isQuery(operationMethod: string) {
  return OpenAPIV3.HttpMethods.GET.toUpperCase() == operationMethod.toUpperCase();
}

export interface ReactQueryFetcherCodegenOptions {
  outputDir: string;
  packageName: string;
}

export default class ReactQueryFetcherCodegen extends CodegenBase<ReactQueryFetcherCodegenOptions> {
  private readonly packageName: string;
  readonly #outputDir: OutputDir;

  constructor(opts: ReactQueryFetcherCodegenOptions) {
    super(opts);
    this.#outputDir = new OutputDir(this.options.outputDir);
    this.packageName = opts.packageName;
  }

  #processOperation = async (args: {
    operationMethod: string;
    operationPath: string;
    pathItem: PathItemObject;
    operation: OperationObject;
  }) => {
    const operationDirPath = getOperationDirectory(args.pathItem, args.operation);
    const operationFilePath = `use-${getOperationFileRelativePath(operationDirPath, args.operation)}`;
    const functionName = camelCase(args.operation.operationId);
    const typePrefix = pascalCase(args.operation.operationId);
    const pascalFunctionName = pascalCase(args.operation.operationId);
    const operationIndexImportPath = path.relative(
      this.#outputDir.resolveDir('index.ts'),
      this.#outputDir.resolve(operationFilePath)
    );

    await this.#outputDir.createDir(operationDirPath);

    const sourceCode = isQuery(args.operationMethod)
      ? await templateDir.render('query-operation.ts.mustache', {
          functionName,
          typePrefix,
          pascalFunctionName,
          importPath: this.packageName,
        })
      : await templateDir.render('mutation-operation.ts.mustache', {
          functionName,
          typePrefix,
          pascalFunctionName,
          importPath: this.packageName,
        });

    await this.#outputDir.writeFile(`${operationFilePath}.ts`, sourceCode);
    await this.#outputDir.formatFile(`${operationFilePath}.ts`);

    await this.#outputDir.appendFile('index.ts', `export * from './${operationIndexImportPath}';`);
  };

  async generate() {
    await this.#outputDir.resetDir();
    await forEachHttpOperation(this.document, this.#processOperation);
    await this.#outputDir.formatFile('index.ts');
  }
}
