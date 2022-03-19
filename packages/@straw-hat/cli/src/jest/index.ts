import * as path from 'path';
import * as fs from 'fs';
import { JestConfigChain } from '@straw-hat/jest-config-chain';
import { createDebugger } from '@straw-hat/cli-core/dist/debug';
import { ContextDir } from '@straw-hat/cli-core/dist/types';

const debug = createDebugger('jest');

function getSetupFileFor(fileName: string) {
  return (context: ContextDir) => {
    return ['mjs', 'js', 'jsx', 'ts', 'tsx']
      .map((ext) => path.join(context, 'tests', 'jest', `${fileName}.${ext}`))
      .find(fs.existsSync);
  };
}

const getSetupFilesAfterEnv = getSetupFileFor('jest.setupFramework');
const getSetupFiles = getSetupFileFor('jest.setup');

export function createBaseConfig(args: { context: ContextDir }) {
  const config = new JestConfigChain();

  config.rootDir(args.context);

  config.resetMocks(true);

  config.clearMocks(true);

  config.collectCoverageFrom.add(`<rootDir>/src/**/*.(mjs|js|jsx|ts|tsx)`).add(`<rootDir>/lib/**/*.(mjs|js)`);

  config.coverageDirectory('<rootDir>/coverage');

  config.coveragePathIgnorePatterns.add('/node_modules/').add('.d.ts$');

  config.moduleFileExtensions
    .set('node', 'node')
    .set('json', 'json')
    .set('js', 'js')
    .set('jsx', 'jsx')
    .set('mjs', 'mjs')
    .set('ts', 'ts')
    .set('tsx', 'tsx');

  config.roots.add('<rootDir>/tests/jest/');

  config.testMatch.add('<rootDir>/tests/jest/**/*.test.(mjs|js|jsx|ts|tsx)');

  config.moduleNameMapper.set('^@/(.*)$', ['<rootDir>/src/$1', '<rootDir>/lib/$1']);

  config.watchPlugins.add('jest-watch-typeahead/filename').add('jest-watch-typeahead/testname');

  config.testEnvironment('node');

  config.transform
    .set('.(ts|tsx)$', require.resolve('ts-jest/dist'))
    .set('.(js|jsx|mjs)$', require.resolve('babel-jest'));

  const setupFiles = getSetupFiles(args.context);
  if (setupFiles) {
    debug(`Setup Files found: ${setupFiles}`);
    config.setupFiles.add(setupFiles);
  }

  const setupFilesAfterEnv = getSetupFilesAfterEnv(args.context);
  if (setupFilesAfterEnv) {
    debug(`Setup Files After Env found: ${setupFiles}`);
    config.setupFilesAfterEnv.add(setupFilesAfterEnv);
  }

  return config;
}
