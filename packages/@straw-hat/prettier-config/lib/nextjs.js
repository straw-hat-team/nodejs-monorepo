const baseConfig = require('./base.js');

module.exports = {
  ...baseConfig,
  plugins: [...baseConfig.plugins, 'prettier-plugin-organize-imports', 'prettier-plugin-tailwindcss'],
  organizeImportsSkipDestructiveCodeActions: true,
  tailwindFunctions: ['clsx'],
};
