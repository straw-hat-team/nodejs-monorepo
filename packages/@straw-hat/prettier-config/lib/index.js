import baseConfig from './base.js';

export default {
  ...baseConfig,
  organizeImportsSkipDestructiveCodeActions: true,
  plugins: [...baseConfig.plugins, 'prettier-plugin-organize-imports'],
};
