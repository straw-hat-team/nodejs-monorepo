import baseConfig from './base.js';

export default {
  ...baseConfig,
  plugins: [...baseConfig.plugins, 'prettier-plugin-organize-imports', 'prettier-plugin-tailwindcss'],
  organizeImportsSkipDestructiveCodeActions: true,
  tailwindFunctions: ['clsx'],
};
