# Custom generators

You could create your own generator. A generator extends from `CodeGenBase`
object, and you will have to define some callback:

```typescript
const path = require('path');
const { TemplateDir } = require('@straw-hat/openapi-web-sdk-generator/dist/template-dir');
const { CodegenBase } = require('@straw-hat/openapi-web-sdk-generator/dist/codegen-base');
const { ensureOperationId, getOperationDirectory } = require('@straw-hat/openapi-web-sdk-generator/dist/helpers');

// Define some template directory somewhere
const templateDir = new TemplateDir(path.join(__dirname, '..', 'templates'));

export interface MyCodegenOptions {
  outputDir: string;
}

class MyCodegen extends CodegenBase<MyCodegenOptions> {
  readonly #outputDir: OutputDir;

  // The constructor must take one-parameter with the configuration object
  constructor(opts: MyCodegenOptions) {
    super(opts);
    this.#outputDir = new OutputDir(this.config.outputDir);
  }

  // You must override this callback
  async generate() {
    await this.#outputDir.resetDir();
    await this.#outputDir.createDir('components');

    // You can use this helper function to make it simple to process operations
    forEachHttpOperation(this.document, this.#processOperation);

    // Format the code using prettier
    this.#outputDir.formatFile('...');
  }

  #processOperation = (args: {
    operationMethod: string;
    operationPath: string;
    pathItem: PathItemObject;
    operation: OperationObject;
  }) => {
    // Enforce Operation ID
    ensureOperationId(args);

    const functionName = camelCase(args.operation.operationId);

    // Render some template
    this.#outputDir.writeFile(
      `${operationFilePath}.ts`,
      templateDir.render('operation.ts.mustache', {
        functionName,
      })
    );

    // Format the code using prettier
    this.#outputDir.formatFile(`${operationFilePath}.ts`);
  };
}

// Super important, it must be a default export
module.exports = MyCodegen;
```
