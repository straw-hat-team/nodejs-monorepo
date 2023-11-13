const baseConfig = require('./base.js');

module.exports = {
  ...baseConfig,
  plugins: [...baseConfig.plugins, 'prettier-plugin-tailwindcss'],
  tailwindFunctions: ['clsx'],
};
