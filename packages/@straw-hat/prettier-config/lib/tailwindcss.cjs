const baseConfig = require('./index');
baseConfig.plugins.push(require('prettier-plugin-tailwindcss'));
module.exports = baseConfig;
