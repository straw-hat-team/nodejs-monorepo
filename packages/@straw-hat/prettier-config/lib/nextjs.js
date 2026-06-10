import baseConfig from './base.js';

export default {
  ...baseConfig,
  plugins: [
    ...baseConfig.plugins,
    import.meta.resolve('prettier-plugin-organize-imports'),
    import.meta.resolve('prettier-plugin-tailwindcss'),
  ],
  organizeImportsSkipDestructiveCodeActions: true,
  tailwindFunctions: ['clsx'],
};
