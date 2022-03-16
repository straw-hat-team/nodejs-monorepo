const createPreset = require('./create-preset');

module.exports = function babelPresetBase(api) {
  return createPreset(api);
};
