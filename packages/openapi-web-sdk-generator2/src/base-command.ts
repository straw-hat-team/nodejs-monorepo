import { Command } from '@oclif/command';
import { OpenApiWebSdkGeneratorConfiguration } from './openapi-web-sdk-generator';
import { loadConfig } from './helpers';

export abstract class BaseCommand extends Command {
  configuration: OpenApiWebSdkGeneratorConfiguration = {};

  override async init() {
    this.configuration = await loadConfig();
  }
}
