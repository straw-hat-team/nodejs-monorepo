import baseConfig from './base.js';

export default {
  ...baseConfig,
  organizeImportsSkipDestructiveCodeActions: true,
  plugins: [...baseConfig.plugins, import.meta.resolve('prettier-plugin-organize-imports')],
};
