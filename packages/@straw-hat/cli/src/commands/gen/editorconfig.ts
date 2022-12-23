import { BaseCommand, Flags } from '@straw-hat/cli-core/dist/base-command';
import { getCwd } from '@straw-hat/cli-core/dist/helpers';
import { render } from '@straw-hat/cli-core/dist/template';
import * as path from 'path';

const templatePath = path.join(
  __dirname,
  '..',
  '..',
  '..',
  'templates',
  'commands',
  'editorconfig',
  '.editorconfig.ejs'
);

function resolveFileLocation(context: string) {
  return path.join(context, '.editorconfig');
}

export class EditorConfigCommand extends BaseCommand {
  static override description = 'generates the .editorconfig file';

  static override flags = {
    context: Flags.string({
      description: 'directory where the .editorconfig file will be created. Defaults to current working directory',
    }),
  };

  async run() {
    const { flags } = await this.parse(EditorConfigCommand);
    const context = flags.context ?? getCwd();
    const destPath = resolveFileLocation(context);

    await render({ fromPath: templatePath, destPath });
  }
}
