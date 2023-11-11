import { Flags } from '@oclif/core'
import { BaseCommand } from '../base-command.js';
import { readOpenApiFile } from '../helpers.js';
import { OpenapiWebSdkGenerator } from '../openapi-web-sdk-generator.js';

export default class LocalCommand extends BaseCommand {
  static override description = 'Generate the code from a local OpenAPI V3 file.';

  static override flags = {
    config: Flags.string({
      required: true,
      description: 'OpenAPI V3 configuration file.',
    }),
  };

  async run(): Promise<void> {
    const { flags } = await this.parse(LocalCommand);

    const generator = new OpenapiWebSdkGenerator({
      context: process.cwd(),
      document: await readOpenApiFile(flags.config),
      config: this.configuration,
    })

    await generator.loadGenerators();
    await generator.generate();
  }
}
