'use strict';

/**
 * @return {import("config").IConfig}
 */
function reloadConfigs () {
  const config = require('config');
  const sources = config.util.getConfigSources();
  for (const { name } of sources) {
    if (name === '$NODE_CONFIG' || name === '--NODE-CONFIG') {
      continue;
    }

    delete require.cache[name];
  }

  delete require.cache[require.resolve('config')];
  return require('config');
}

/**
 * @param {boolean} [reload=false] Whether to reload the configuration
 * @return {import("config").IConfig}
 */
module.exports = function (reload) {
  return reload ? reloadConfigs() : require('config');
};

module.exports.reloadConfigs = reloadConfigs;
