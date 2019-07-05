const tap = require('tap');
const path = require('path');

process.env.NODE_CONFIG_DIR = path.join(__dirname, 'config');
process.env.NODE_CONFIG = '{ "prop": "value" }';

const config = require('../index');

tap.test('By default, config is immutable', function (t) {
  const r1 = config().get('rand');
  const r2 = config().get('rand');
  t.equal(r1, r2);
  t.end();
});

tap.test('config.reload() should reload the config', function (t) {
  const r1 = config().get('rand');
  config.reloadConfigs();
  const r2 = config().get('rand');
  t.notEqual(r1, r2);
  t.end();
});

tap.test('config(true) should reload the config', function (t) {
  const r1 = config().get('rand');
  const r2 = config(true).get('rand');
  t.notEqual(r1, r2);
  t.end();
});
