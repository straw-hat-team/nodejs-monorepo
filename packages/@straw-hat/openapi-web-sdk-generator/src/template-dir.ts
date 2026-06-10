import Mustache from 'mustache';
import * as fs from 'node:fs/promises';
import { Dir } from './dir.js';
import { FancyMap } from './fancy-map.js';
import { createDebugger } from './helpers.js';

export class TemplateDir extends Dir {
  protected override debug = createDebugger('template-dir');
  private templates = new FancyMap<string, string>();

  async render(relativePath: string, data: Record<any, any> = {}) {
    const templatePath = this.resolve(relativePath);
    const templateContent = await this.templates.getOrSet(templatePath, () => {
      this.debug(`Reading template ${templatePath}`);
      return fs.readFile(templatePath, { encoding: 'utf8' });
    });

    return Mustache.render(templateContent, data);
  }
}
