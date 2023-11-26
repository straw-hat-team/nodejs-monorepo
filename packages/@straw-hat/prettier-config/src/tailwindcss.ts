import type { Options } from 'prettier';
import baseConfig from './base.js';

export default {
  ...baseConfig,
  plugins: [...baseConfig.plugins, import.meta.resolve('prettier-plugin-tailwindcss')],
  tailwindFunctions: ['clsx'],
} satisfies Options;
