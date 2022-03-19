import EJS from 'ejs';
import { prompt } from 'enquirer';
import * as fs from 'fs';
import { success } from './chalk';
import { log } from './log';
import { FancyMap } from '@straw-hat/fancy-map';

const templateCache = new FancyMap<string, string>();

export async function render(args: { fromPath: string; destPath: string; data?: unknown; override?: boolean }) {
  const override = args.override ?? false;
  const templateData = {
    fromPath: args.fromPath,
    destPath: args.destPath,
    data: args.data ?? {},
  };

  const templateContent = templateCache.getOrSet(args.fromPath, readTemplateContent);

  const content = await EJS.render(templateContent, templateData, {
    async: true,
  });

  return writeContent({ destPath: args.destPath, content, override });
}

function readTemplateContent(fromPath: string) {
  if (!fs.lstatSync(fromPath).isFile()) {
    throw new Error(`${fromPath} template must be a file.`);
  }

  return fs.readFileSync(fromPath, { encoding: 'utf8' });
}

async function writeContent(args: { destPath: string; content: string; override: boolean }) {
  const shouldWriteFile = await checkDestinationFile(args.destPath, args.override);

  if (!shouldWriteFile) {
    return;
  }

  log(success(`Writing ${args.destPath} file.`));
  fs.writeFileSync(args.destPath, args.content);
}

async function checkDestinationFile(destPath: string, override: boolean) {
  if (override) {
    return true;
  }

  if (!fs.existsSync(destPath)) {
    return true;
  }

  return confirmAction(destPath);
}

async function confirmAction(destPath: string) {
  const response = await prompt<{ confirmed: boolean }>({
    type: 'confirm',
    initial: true,
    name: 'confirmed',
    message: `File ${destPath} already exists, are you sure you want to override it?`,
  });

  return response.confirmed;
}
