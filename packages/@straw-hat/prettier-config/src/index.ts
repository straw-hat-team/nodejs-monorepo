import type { Options } from 'prettier';
import baseConfig from './base.js';

export default {
  ...baseConfig,
  organizeImportsSkipDestructiveCodeActions: true,
  plugins: [...baseConfig.plugins, import.meta.resolve('prettier-plugin-organize-imports')],
} satisfies Options;
