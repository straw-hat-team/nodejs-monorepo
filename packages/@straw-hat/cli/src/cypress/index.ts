import * as path from 'path';
import fs from 'fs';
import { touchFileSync } from '@straw-hat/cli-core/dist/helpers';
import { ContextDir } from '@straw-hat/cli-core/dist/types';

export function createConfig(args: { context: ContextDir; spec?: string }) {
  const cypressDir = path.join(args.context, 'tests', 'cypress');
  return {
    config: {
      fileServerFolder: cypressDir,
      integrationFolder: path.join(cypressDir, 'integration'),
      screenshotsFolder: path.join(cypressDir, 'screenshots'),
      videosFolder: path.join(cypressDir, 'videos'),
      fixturesFolder: path.join(cypressDir, 'fixtures'),
      pluginsFile: path.join(__dirname, 'plugins.js'),
      supportFile: getSupportFile(cypressDir),
      testFiles: '**/*.e2e.*',
    },
    project: cypressDir,
    spec: args.spec,
  };
}

function getSupportFile(cypressDir: string) {
  const foundFile = ['mjs', 'js', 'jsx', 'ts', 'tsx']
    .map((ext) => path.join(cypressDir, 'support', `index.${ext}`))
    .find(fs.existsSync);

  if (foundFile) {
    return foundFile;
  }

  const filePath = path.join(cypressDir, 'support', 'index.js');

  return touchFileSync(filePath);
}
