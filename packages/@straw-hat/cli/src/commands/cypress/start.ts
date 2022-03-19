import Cypress from 'cypress';
import { BaseCommand, Flags } from '@straw-hat/cli-core/dist/base-command';
import { getCwd, isCI, setNodeEnv } from '@straw-hat/cli-core/dist/helpers';
import { createConfig } from '../../cypress';

export class CypressStartCommand extends BaseCommand {
  static override description = 'runs Cypress';

  static override flags = {
    spec: Flags.string({
      description: 'specify the tests to run',
    }),
    headless: Flags.boolean({
      default: false,
      description: 'runs the tests in headless mode. Useful for CI/CD',
    }),
  };

  static override strict = false;

  async run() {
    setNodeEnv('test');
    const { flags } = await this.parse(CypressStartCommand);
    const context = getCwd();
    const cypressConfig = createConfig({ context: context, spec: flags.spec });
    return isCI() || flags.headless ? Cypress.run(cypressConfig) : Cypress.open(cypressConfig);
  }
}
