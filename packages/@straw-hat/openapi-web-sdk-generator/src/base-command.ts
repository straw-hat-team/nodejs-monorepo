import { Command } from '@oclif/command';
import { loadConfig } from './helpers';
import { OpenApiWebSdkGeneratorConfiguration } from './openapi-web-sdk-generator';

export abstract class BaseCommand extends Command {
  configuration: OpenApiWebSdkGeneratorConfiguration = {};

  override async init() {
    this.configuration = await loadConfig();
  }
}
