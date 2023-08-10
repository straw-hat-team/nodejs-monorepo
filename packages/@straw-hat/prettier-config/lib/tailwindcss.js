import tailwindcssPlugin from 'prettier-plugin-tailwindcss';
import baseConfig from './base.js';

export default {
  ...baseConfig,
  plugins: [...baseConfig.plugins, tailwindcssPlugin],
  tailwindFunctions: ['clsx'],
};
