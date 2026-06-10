const baseConfig = require('./base.js');

module.exports = {
  ...baseConfig,
  organizeImportsSkipDestructiveCodeActions: true,
  plugins: [...baseConfig.plugins, import.meta.resolve('prettier-plugin-organize-imports')],
};
