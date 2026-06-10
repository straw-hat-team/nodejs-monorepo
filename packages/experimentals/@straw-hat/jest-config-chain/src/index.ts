import { ChainedMap, ChainedSet, OrderableChainedMap } from '@straw-hat/chainable-config';

export type CoverageThreshold = {
  [K: string]: {
    branches?: number;
    functions?: number;
    lines?: number;
    statements?: number;
  };
};
export type Timers = 'real' | 'legacy' | 'fake';
export type DisplayName = string | { name: string; color: string };
export type Reporter = string | [string, Record<string, any>];
export type WatchPlugin = string | [string, Record<string, any>];
export type Project = string | JestConfigChain[];
export type ReporterConfig = any;
export type CoverageReporter = string | [string, ReporterConfig];
export type Transformer = string | [string, Record<string, any>];
export type NotifyMode = 'always' | 'failure' | 'success' | 'change' | 'success-change' | 'failure-change';
export type HasteConfig = {
  computeSha1?: boolean;
  defaultPlatform?: string | null;
  hasteImplModulePath?: string;
  platforms?: Array<string>;
  throwOnModuleCollision?: boolean;
};

export class ModuleDirectories extends OrderableChainedMap<JestConfigChain> {
  constructor(parent: JestConfigChain) {
    super(parent, {
      name: 'jestConfig.moduleDirectories',
      asArray: true,
      emptyAsUndefined: true,
    });
  }
}
export class ModuleFileExtensions extends OrderableChainedMap<JestConfigChain> {
  constructor(parent: JestConfigChain) {
    super(parent, {
      name: 'jestConfig.moduleFileExtensions',
      asArray: true,
      emptyAsUndefined: true,
    });
  }
}

export class TransformIgnorePatterns extends ChainedMap<JestConfigChain> {
  constructor(parent: JestConfigChain) {
    super(parent, {
      name: 'jestConfig.transformIgnorePatterns',
      asArray: true,
      emptyAsUndefined: true,
    });
  }
}

export class ModulePaths extends OrderableChainedMap<JestConfigChain> {
  constructor(parent: JestConfigChain) {
    super(parent, {
      name: 'jestConfig.modulePaths',
      asArray: true,
      emptyAsUndefined: true,
    });
  }
}

export class ModuleNameMapper extends OrderableChainedMap<JestConfigChain, string | string[]> {
  constructor(parent: JestConfigChain) {
    super(parent, {
      name: 'jestConfig.moduleNameMapper',
      emptyAsUndefined: true,
    });
  }
}

export class Transform extends OrderableChainedMap<JestConfigChain> {
  constructor(parent: JestConfigChain) {
    super(parent, {
      name: 'jestConfig.transform',
      emptyAsUndefined: true,
    });
  }
}

export class CollectCoverageFrom extends ChainedSet<JestConfigChain, string> {
  constructor(parent: JestConfigChain) {
    super(parent, {
      emptyAsUndefined: true,
    });
  }
}

export class CoveragePathIgnorePatterns extends ChainedSet<JestConfigChain, string> {
  constructor(parent: JestConfigChain) {
    super(parent, {
      emptyAsUndefined: true,
    });
  }
}

export class ExtraGlobals extends ChainedSet<JestConfigChain, string> {
  constructor(parent: JestConfigChain) {
    super(parent, {
      emptyAsUndefined: true,
    });
  }
}

export class ForceCoverageMatch extends ChainedSet<JestConfigChain, string> {
  constructor(parent: JestConfigChain) {
    super(parent, {
      emptyAsUndefined: true,
    });
  }
}

export class TestRegex extends ChainedSet<JestConfigChain, string> {
  constructor(parent: JestConfigChain) {
    super(parent, {
      emptyAsUndefined: true,
    });
  }
}

export class TestPathIgnorePatterns extends ChainedSet<JestConfigChain, string> {
  constructor(parent: JestConfigChain) {
    super(parent, {
      emptyAsUndefined: true,
    });
  }
}

export class TestMatch extends ChainedSet<JestConfigChain, string> {
  constructor(parent: JestConfigChain) {
    super(parent, {
      emptyAsUndefined: true,
    });
  }
}

export class WatchPathIgnorePatterns extends ChainedSet<JestConfigChain, string> {
  constructor(parent: JestConfigChain) {
    super(parent, {
      emptyAsUndefined: true,
    });
  }
}

export class SnapshotSerializers extends ChainedSet<JestConfigChain, string> {
  constructor(parent: JestConfigChain) {
    super(parent, {
      emptyAsUndefined: true,
    });
  }
}

export class ModulePathIgnorePatterns extends ChainedSet<JestConfigChain, string> {
  constructor(parent: JestConfigChain) {
    super(parent, {
      emptyAsUndefined: true,
    });
  }
}

export class Roots extends ChainedSet<JestConfigChain, string> {
  constructor(parent: JestConfigChain) {
    super(parent, {
      emptyAsUndefined: true,
    });
  }
}

export class SetupFiles extends ChainedSet<JestConfigChain, string> {
  constructor(parent: JestConfigChain) {
    super(parent, {
      emptyAsUndefined: true,
    });
  }
}

export class WatchPlugins extends ChainedSet<JestConfigChain, WatchPlugin> {
  constructor(parent: JestConfigChain) {
    super(parent, {
      emptyAsUndefined: true,
    });
  }
}

export class SetupFilesAfterEnv extends ChainedSet<JestConfigChain, string> {
  constructor(parent: JestConfigChain) {
    super(parent, {
      emptyAsUndefined: true,
    });
  }
}

export class UnmockedModulePathPatterns extends ChainedSet<JestConfigChain, string> {
  constructor(parent: JestConfigChain) {
    super(parent, {
      emptyAsUndefined: true,
    });
  }
}

export class Reporters extends ChainedSet<JestConfigChain, Reporter> {
  constructor(parent: JestConfigChain) {
    super(parent, {
      emptyAsUndefined: true,
    });
  }
}

export class CoverageReporters extends ChainedSet<JestConfigChain, CoverageReporter> {
  constructor(parent: JestConfigChain) {
    super(parent, {
      emptyAsUndefined: true,
    });
  }
}

export class Projects extends ChainedSet<JestConfigChain, Project> {
  constructor(parent: JestConfigChain) {
    super(parent, {
      emptyAsUndefined: true,
    });
  }
}

export class JestConfigChain extends ChainedMap<undefined> {
  constructor() {
    super(undefined, { name: 'jestConfig' });
    this.set('modulePaths', new ModulePaths(this));
    this.set('transformIgnorePatterns', new TransformIgnorePatterns(this));
    this.set('moduleFileExtensions', new ModuleFileExtensions(this));
    this.set('moduleDirectories', new ModuleDirectories(this));
    this.set('moduleNameMapper', new ModuleNameMapper(this));
    this.set('collectCoverageFrom', new CollectCoverageFrom(this));
    this.set('coveragePathIgnorePatterns', new CoveragePathIgnorePatterns(this));
    this.set('coverageReporters', new CoverageReporters(this));
    this.set('extraGlobals', new ExtraGlobals(this));
    this.set('forceCoverageMatch', new ForceCoverageMatch(this));
    this.set('testRegex', new TestRegex(this));
    this.set('testPathIgnorePatterns', new TestPathIgnorePatterns(this));
    this.set('testMatch', new TestMatch(this));
    this.set('watchPathIgnorePatterns', new WatchPathIgnorePatterns(this));
    this.set('snapshotSerializers', new SnapshotSerializers(this));
    this.set('modulePathIgnorePatterns', new ModulePathIgnorePatterns(this));
    this.set('roots', new Roots(this));
    this.set('setupFiles', new SetupFiles(this));
    this.set('setupFilesAfterEnv', new SetupFilesAfterEnv(this));
    this.set('unmockedModulePathPatterns', new UnmockedModulePathPatterns(this));
    this.set('reporters', new Reporters(this));
    this.set('watchPlugins', new WatchPlugins(this));
    this.set('projects', new Projects(this));
    this.set('transform', new Transform(this));
  }

  get transform(): Transform {
    return this.get('transform');
  }

  get projects(): Projects {
    return this.get('projects');
  }

  get watchPlugins(): WatchPlugins {
    return this.get('watchPlugins');
  }

  get reporters(): Reporters {
    return this.get('reporters');
  }

  get unmockedModulePathPatterns(): UnmockedModulePathPatterns {
    return this.get('unmockedModulePathPatterns');
  }

  get moduleNameMapper(): ModuleNameMapper {
    return this.get('moduleNameMapper');
  }

  get setupFilesAfterEnv(): SetupFilesAfterEnv {
    return this.get('setupFilesAfterEnv');
  }

  get setupFiles(): SetupFiles {
    return this.get('setupFiles');
  }

  get roots(): Roots {
    return this.get('roots');
  }

  get modulePathIgnorePatterns(): ModulePathIgnorePatterns {
    return this.get('modulePathIgnorePatterns');
  }

  get modulePaths(): ModulePaths {
    return this.get('modulePaths');
  }

  get snapshotSerializers(): SnapshotSerializers {
    return this.get('snapshotSerializers');
  }

  get watchPathIgnorePatterns(): WatchPathIgnorePatterns {
    return this.get('watchPathIgnorePatterns');
  }

  get testMatch(): TestMatch {
    return this.get('testMatch');
  }

  get testRegex(): TestRegex {
    return this.get('testRegex');
  }

  get testPathIgnorePatterns(): TestPathIgnorePatterns {
    return this.get('testPathIgnorePatterns');
  }

  get transformIgnorePatterns(): TransformIgnorePatterns {
    return this.get('transformIgnorePatterns');
  }

  get moduleFileExtensions(): ModuleFileExtensions {
    return this.get('moduleFileExtensions');
  }

  get moduleDirectories(): ModuleDirectories {
    return this.get('moduleDirectories');
  }

  get forceCoverageMatch(): ForceCoverageMatch {
    return this.get('forceCoverageMatch');
  }

  get extraGlobals(): ExtraGlobals {
    return this.get('extraGlobals');
  }

  get collectCoverageFrom(): CollectCoverageFrom {
    return this.get('collectCoverageFrom');
  }

  get coveragePathIgnorePatterns(): CoveragePathIgnorePatterns {
    return this.get('coveragePathIgnorePatterns');
  }

  get coverageReporters(): CoverageReporters {
    return this.get('coverageReporters');
  }

  slowTestThreshold(value?: number) {
    return this.set('slowTestThreshold', value);
  }

  snapshotResolver(value?: string) {
    return this.set('snapshotResolver', value);
  }

  testResultsProcessor(value?: string) {
    return this.set('testResultsProcessor', value);
  }

  coverageProvider(value?: string) {
    return this.set('coverageProvider', value);
  }

  maxConcurrency(value?: number) {
    return this.set('maxConcurrency', value);
  }

  globalTeardown(value?: string) {
    return this.set('globalTeardown', value);
  }

  injectGlobals(value?: boolean) {
    return this.set('injectGlobals', value);
  }

  haste(value?: HasteConfig) {
    return this.set('haste', value);
  }

  automock(value?: boolean) {
    return this.set('automock', value);
  }

  bail(value?: boolean | number) {
    return this.set('bail', value);
  }

  globalSetup(value?: string) {
    return this.set('globalSetup', value);
  }

  browser(value?: boolean) {
    return this.set('browser', value);
  }

  cacheDirectory(value?: string) {
    return this.set('cacheDirectory', value);
  }

  clearMocks(value?: boolean) {
    return this.set('clearMocks', value);
  }

  collectCoverage(value?: boolean) {
    return this.set('collectCoverage', value);
  }

  coverageDirectory(value?: string) {
    return this.set('coverageDirectory', value);
  }

  coverageThreshold(value?: CoverageThreshold) {
    return this.set('coverageThreshold', value);
  }

  dependencyExtractor(value?: string) {
    return this.set('dependencyExtractor', value);
  }

  testEnvironment(value?: string) {
    return this.set('testEnvironment', value);
  }

  testEnvironmentOptions(value?: Record<string, any>) {
    return this.set('testEnvironmentOptions', value);
  }

  displayName(value?: DisplayName) {
    return this.set('displayName', value);
  }

  errorOnDeprecated(value?: boolean) {
    return this.set('errorOnDeprecated', value);
  }

  testFailureExitCode(value?: number) {
    return this.set('testFailureExitCode', value);
  }

  testTimeout(value?: number) {
    return this.set('testTimeout', value);
  }

  timers(value?: Timers) {
    return this.set('timers', value);
  }

  testURL(value?: string) {
    return this.set('testURL', value);
  }

  globals(value?: Record<string, any>) {
    return this.set('globals', value);
  }

  notify(value?: boolean) {
    return this.set('notify', value);
  }

  resetMocks(value?: boolean) {
    return this.set('resetMocks', value);
  }

  resetModules(value?: boolean) {
    return this.set('resetModules', value);
  }

  runner(value?: string) {
    return this.set('runner', value);
  }

  restoreMocks(value?: boolean) {
    return this.set('restoreMocks', value);
  }

  preset(value?: string) {
    return this.set('preset', value);
  }

  presetPath(value?: string) {
    return this.set('presetPath', value);
  }

  prettierPath(value?: string) {
    return this.set('prettierPath', value);
  }

  verbose(value?: boolean) {
    return this.set('verbose', value);
  }

  resolver(value?: string) {
    return this.set('resolver', value);
  }

  rootDir(value?: string) {
    return this.set('rootDir', value);
  }

  testRunner(value?: string) {
    return this.set('testRunner', value);
  }

  testSequencer(value?: string) {
    return this.set('testSequencer', value);
  }

  watchman(value?: boolean) {
    return this.set('watchman', value);
  }

  notifyMode(value?: NotifyMode) {
    return this.set('notifyMode', value);
  }
}
