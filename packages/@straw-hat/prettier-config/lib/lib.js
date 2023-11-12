const baseConfig = require('./base.js');

module.exports = {
  ...baseConfig,
  organizeImportsSkipDestructiveCodeActions: true,
  plugins: [...baseConfig.plugins, 'prettier-plugin-organize-imports'],
};
