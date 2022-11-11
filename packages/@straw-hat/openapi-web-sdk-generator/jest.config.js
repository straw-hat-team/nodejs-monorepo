const esModules = [
  'del',
  'globby',
  'slash',
  'is-path-cwd',
  'is-path-inside',
  'p-map',
  'aggregate-error',
  'indent-string',
  'clean-stack',
  'escape-string-regexp',
].join('|');

module.exports = {
  transform: {
    '^.+\\.(t|j|mj)sx?$': ['@swc/jest'],
  },
  transformIgnorePatterns: [`/node_modules/(?!${esModules})`],
  testEnvironment: 'node',
};
