import { describe, expect, test } from 'vitest';
import { JestConfigChain } from '../../src';

describe('JestConfigChain', () => {
  test('outputs the right configuration', () => {
    const jestConfig = new JestConfigChain()
      .automock(true)
      .bail(2)
      .browser(true)
      .cacheDirectory('/tmp/<path>')
      .clearMocks(true)
      .collectCoverage(true)
      .collectCoverageFrom.add('**/*.{js,jsx}')
      .add('!**/node_modules/**')
      .add('!**/vendor/**')
      .end()
      .coverageDirectory('coverage')
      .coveragePathIgnorePatterns.add('/node_modules/')
      .end()
      .coverageReporters.add('json')
      .add('lcov')
      .add('text')
      .add('clover')
      .end()
      .coverageThreshold({
        global: {
          branches: 50,
          functions: 50,
          lines: 50,
          statements: 50,
        },
        './src/components/': {
          branches: 40,
          statements: 40,
        },
        './src/reducers/**/*.js': {
          statements: 90,
        },
        './src/api/very-important-module.js': {
          branches: 100,
          functions: 100,
          lines: 100,
          statements: 100,
        },
      })
      .dependencyExtractor('mymodule')
      .displayName({
        name: 'CLIENT',
        color: 'blue',
      })
      .errorOnDeprecated(false)
      .extraGlobals.add('Math')
      .end()
      .forceCoverageMatch.add('**/*.t.js')
      .end()
      .globals({
        __DEV__: true,
      })
      .globalSetup('setup.js')
      .haste({ computeSha1: true })
      .maxConcurrency(5)
      .moduleDirectories.set('nodeDeps', 'node_modules')
      .end()
      .moduleFileExtensions.set('js', 'js')
      .set('json', 'json')
      .set('jsx', 'jsx')
      .set('ts', 'ts')
      .set('tsx', 'tsx')
      .set('node', 'node')
      .end()
      .notify(true)
      .notifyMode('failure-change')
      .watchman(true)
      .testEnvironment('jsdom')
      .testEnvironmentOptions({ userAgent: 'Agent/007' })
      .testFailureExitCode(1)
      .testTimeout(2)
      .testURL('http://localhost/pepeg')
      .timers('real')
      .verbose(true)
      .preset('./node_modules/foo-bar/jest-preset.js')
      .presetPath('pepeg')
      .resolver('browser-resolve')
      .rootDir('<rootDir>/src')
      .testRunner('jasmine2')
      .testSequencer('@jest/test-sequencer')
      .restoreMocks(true)
      .runner('jest-runner')
      .resetMocks(true)
      .resetModules(true)
      .testResultsProcessor('my-module-name')
      .snapshotResolver('mySnapshotResolver.js')
      .globalTeardown('globalTeardown')
      .testRegex.add('(/__tests__/.*|(\\.|/)(test|spec))\\.[jt]sx?$')
      .end()
      .testPathIgnorePatterns.add('/node_modules/')
      .end()
      .testMatch.add('**/__tests__/**/*.[jt]s?(x)')
      .add('**/?(*.)+(spec|test).[jt]s?(x)')
      .end()
      .watchPathIgnorePatterns.add('some/path')
      .end()
      .snapshotSerializers.add('my-serializer-module')
      .end()
      .slowTestThreshold(123)
      .transform.set('\\.js$', ['babel-jest', { rootMode: 'upward' }])
      .end()
      .coverageProvider('coverageProvider')
      .transformIgnorePatterns.set('nodeDeps', '/node_modules/')
      .end()
      .unmockedModulePathPatterns.add('somemodule')
      .end()
      .roots.add('<rootDir>/src/')
      .add('<rootDir>/tests/')
      .end()
      .moduleNameMapper.set('^image![a-zA-Z0-9$_-]+$', 'GlobalImageStub', { alias: 'images' })
      .set('^[./a-zA-Z0-9$_-]+\\.png$', '<rootDir>/RelativeImageStub.js')
      .set('module_name_(.*)', '<rootDir>/substituted_module_$1.js')
      .end()
      .setupFiles.add('<rootDir>/mysetupFile1.js')
      .add('<rootDir>/mysetupFile2.js')
      .end()
      .prettierPath('prettier')
      .resetModules(true)
      .restoreMocks(true)
      .restoreMocks(true)
      .modulePathIgnorePatterns.add('<rootDir>/build/')
      .end()
      .modulePaths.set('app', '<rootDir>/app/')
      .end()
      .projects.add('<rootDir>')
      .add('<rootDir>/examples/*')
      .end()
      .reporters.add('default')
      .add(['<rootDir>/my-custom-reporter.js', { banana: 'yes', pineapple: 'no' }])
      .end()
      .setupFilesAfterEnv.add('<rootDir>/mysetupFileAfterEnv1.js')
      .add('<rootDir>/mysetupFileAfterEnv2.js')
      .end()
      .injectGlobals(true)
      .watchPlugins.add('watcher-pepeg')
      .end();

    expect(jestConfig.toConfig()).toEqual({
      watchPlugins: ['watcher-pepeg'],
      injectGlobals: true,
      slowTestThreshold: 123,
      automock: true,
      bail: 2,
      browser: true,
      cacheDirectory: '/tmp/<path>',
      clearMocks: true,
      collectCoverage: true,
      collectCoverageFrom: ['**/*.{js,jsx}', '!**/node_modules/**', '!**/vendor/**'],
      coverageDirectory: 'coverage',
      coveragePathIgnorePatterns: ['/node_modules/'],
      coverageProvider: 'coverageProvider',
      coverageReporters: ['json', 'lcov', 'text', 'clover'],
      coverageThreshold: {
        global: {
          branches: 50,
          functions: 50,
          lines: 50,
          statements: 50,
        },
        './src/components/': {
          branches: 40,
          statements: 40,
        },
        './src/reducers/**/*.js': {
          statements: 90,
        },
        './src/api/very-important-module.js': {
          branches: 100,
          functions: 100,
          lines: 100,
          statements: 100,
        },
      },
      dependencyExtractor: 'mymodule',
      displayName: {
        name: 'CLIENT',
        color: 'blue',
      },
      errorOnDeprecated: false,
      extraGlobals: ['Math'],
      forceCoverageMatch: ['**/*.t.js'],
      globals: {
        __DEV__: true,
      },
      globalSetup: 'setup.js',
      globalTeardown: 'globalTeardown',
      maxConcurrency: 5,
      moduleDirectories: ['node_modules'],
      moduleFileExtensions: ['js', 'json', 'jsx', 'ts', 'tsx', 'node'],
      moduleNameMapper: {
        '^image![a-zA-Z0-9$_-]+$': 'GlobalImageStub',
        '^[./a-zA-Z0-9$_-]+\\.png$': '<rootDir>/RelativeImageStub.js',
        'module_name_(.*)': '<rootDir>/substituted_module_$1.js',
      },
      modulePathIgnorePatterns: ['<rootDir>/build/'],
      modulePaths: ['<rootDir>/app/'],
      notify: true,
      notifyMode: 'failure-change',
      preset: './node_modules/foo-bar/jest-preset.js',
      prettierPath: 'prettier',
      projects: ['<rootDir>', '<rootDir>/examples/*'],
      reporters: ['default', ['<rootDir>/my-custom-reporter.js', { banana: 'yes', pineapple: 'no' }]],
      resetMocks: true,
      resetModules: true,
      resolver: 'browser-resolve',
      restoreMocks: true,
      rootDir: '<rootDir>/src',
      roots: ['<rootDir>/src/', '<rootDir>/tests/'],
      runner: 'jest-runner',
      setupFiles: ['<rootDir>/mysetupFile1.js', '<rootDir>/mysetupFile2.js'],
      setupFilesAfterEnv: ['<rootDir>/mysetupFileAfterEnv1.js', '<rootDir>/mysetupFileAfterEnv2.js'],
      snapshotResolver: 'mySnapshotResolver.js',
      snapshotSerializers: ['my-serializer-module'],
      testEnvironment: 'jsdom',
      testEnvironmentOptions: {
        userAgent: 'Agent/007',
      },
      testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
      testPathIgnorePatterns: ['/node_modules/'],
      testRegex: ['(/__tests__/.*|(\\.|/)(test|spec))\\.[jt]sx?$'],
      testResultsProcessor: 'my-module-name',
      testRunner: 'jasmine2',
      testSequencer: '@jest/test-sequencer',
      testURL: 'http://localhost/pepeg',
      timers: 'real',
      transform: { '\\.js$': ['babel-jest', { rootMode: 'upward' }] },
      transformIgnorePatterns: ['/node_modules/'],
      unmockedModulePathPatterns: ['somemodule'],
      verbose: true,
      watchPathIgnorePatterns: ['some/path'],
      watchman: true,
      testTimeout: 2,
      haste: {
        computeSha1: true,
      },
      testFailureExitCode: 1,
      presetPath: 'pepeg',
    });
  });
});
