import organizeImportsPlugin from 'prettier-plugin-organize-imports';
import baseConfig from './base.js';

export default {
  ...baseConfig,
  organizeImportsSkipDestructiveCodeActions: true,
  plugins: [...baseConfig.plugins, organizeImportsPlugin],
};
