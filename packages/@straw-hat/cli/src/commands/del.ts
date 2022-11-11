import { deleteAsync } from 'del';
import { prompt } from 'enquirer';
import { BaseCommand, Flags } from '@straw-hat/cli-core/dist/base-command';
import * as chalk from '@straw-hat/cli-core/dist/chalk';
import { log, newline } from '@straw-hat/cli-core/dist/log';

export class DelCommand extends BaseCommand {
  static override description = 'removes things';

  static override args = [
    {
      name: 'path',
      required: true,
      description: 'path that will be remove',
    },
  ];

  static override strict = false;

  static override flags = {
    yes: Flags.boolean({
      default: false,
      char: 'y',
      description: "automatically answer 'Yes' to the question",
    }),
    dryRun: Flags.boolean({
      default: false,
      char: 'd',
      description: 'list what would be deleted instead of deleting',
    }),
    force: Flags.boolean({
      default: false,
      char: 'f',
      description: 'allow deleting the current working directory and outside',
    }),
  };

  async run() {
    const { args, flags } = await this.parse(DelCommand);

    if (!flags.dryRun) {
      // @ts-ignore Related to: https://github.com/oclif/command/issues/43
      await this.#confirm(flags, args);
    }

    const deletedFiles = await deleteAsync(args.path, {
      force: flags.force,
      dryRun: flags.dryRun,
    });

    if (deletedFiles.length === 0) {
      log(chalk.info(`${chalk.highlight(args.path)} does not match any files.`));
      return;
    }

    if (flags.dryRun) {
      log(chalk.highlight('This is a dry run, the files will no be remove.'));
    } else {
      log(chalk.success('Removing following files.'));
    }

    log(chalk.info(deletedFiles.join('\n')));
    newline();
  }

  #confirm = async (flags: { yes: boolean }, args: { path: string }) => {
    const response = await prompt<{ shouldRun: boolean }>({
      type: 'confirm',
      initial: true,
      name: 'shouldRun',
      message: `Are you sure you want to remove "${args.path}"?`,
      skip: flags.yes,
    });

    if (!response.shouldRun) {
      this.exit(0);
    }
  };
}
