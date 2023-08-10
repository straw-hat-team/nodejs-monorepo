import organizeImportsPlugin from 'prettier-plugin-organize-imports';
import tailwindcssPlugin from 'prettier-plugin-tailwindcss';
import baseConfig from './base.js';

export default {
  ...baseConfig,
  plugins: [...baseConfig.plugins, organizeImportsPlugin, tailwindcssPlugin],
  organizeImportsSkipDestructiveCodeActions: true,
  tailwindFunctions: ['clsx'],
};
