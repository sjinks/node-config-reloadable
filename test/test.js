const { deepEqual, notDeepEqual } = require('node:assert/strict');
const { join } = require('node:path');

process.env.NODE_CONFIG_DIR = join(__dirname, 'config');
process.env.NODE_CONFIG = '{ "prop": "value" }';

const config = require('../index');

it('By default, config is immutable', function () {
  const r1 = config().get('rand');
  const r2 = config().get('rand');
  deepEqual(r1, r2);
});

it('config.reload() should reload the config', function () {
  const r1 = config().get('rand');
  config.reloadConfigs();
  const r2 = config().get('rand');
  notDeepEqual(r1, r2);
});

it('config(true) should reload the config', function () {
  const r1 = config().get('rand');
  const r2 = config(true).get('rand');
  notDeepEqual(r1, r2);
});
