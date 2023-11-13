export { Flags } from '@oclif/core';
import { Command } from '@oclif/core';

import chalk from 'chalk';
import * as ciInfo from 'ci-info';
import { createDebugger } from './debug';
import { isCI } from './helpers';

export abstract class BaseCommand extends Command {
  override debug = createDebugger('base-command');

  override async init() {
    this.debug(`${this.config.name}: ${chalk.green(this.config.version)}`);
    if (isCI()) {
      this.#onCI();
    }
  }

  #onCI = () => {
    const ciName = ciInfo.name ?? 'Unknown Continuous Integration environment';
    this.debug(`Running on ${ciName}`);
  };
}
