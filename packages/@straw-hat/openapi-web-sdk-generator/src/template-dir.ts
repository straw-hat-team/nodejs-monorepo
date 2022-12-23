import { FancyMap } from '@straw-hat/fancy-map';
import * as fs from 'fs';
import * as Mustache from 'mustache';
import { Dir } from './dir';
import { createDebugger } from './helpers';

export class TemplateDir extends Dir {
  protected override debug = createDebugger('template-dir');
  private templates = new FancyMap<string, string>();

  async render(relativePath: string, data: Record<any, any> = {}) {
    const templatePath = this.resolve(relativePath);
    const templateContent = await this.templates.getOrSet(templatePath, () => {
      this.debug(`Reading template ${templatePath}`);
      return fs.promises.readFile(templatePath, { encoding: 'utf8' });
    });

    return Mustache.render(templateContent, data);
  }
}
