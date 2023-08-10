import baseConfig from './base.js';

export default {
  ...baseConfig,
  plugins: [...baseConfig.plugins, 'prettier-plugin-tailwindcss'],
  tailwindFunctions: ['clsx'],
};
