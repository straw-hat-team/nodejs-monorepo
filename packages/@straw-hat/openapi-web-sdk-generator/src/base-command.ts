import { Command } from '@oclif/core';
import { loadConfig } from './helpers.js';
import { OpenApiWebSdkGeneratorConfiguration } from './openapi-web-sdk-generator.js';

export abstract class BaseCommand extends Command {
  configuration: OpenApiWebSdkGeneratorConfiguration = {};

  override async init() {
    this.configuration = await loadConfig();
  }
}
