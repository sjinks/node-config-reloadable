const { expect } = require('chai');
const path = require('path');

process.env.NODE_CONFIG_DIR = path.join(__dirname, 'config');
process.env.NODE_CONFIG = '{ "prop": "value" }';

const config = require('../index');

it('By default, config is immutable', function () {
  const r1 = config().get('rand');
  const r2 = config().get('rand');
  expect(r1).to.be.deep.equal(r2);
});

it('config.reload() should reload the config', function () {
  const r1 = config().get('rand');
  config.reloadConfigs();
  const r2 = config().get('rand');
  expect(r1).not.to.be.deep.equal(r2);
});

it('config(true) should reload the config', function () {
  const r1 = config().get('rand');
  const r2 = config(true).get('rand');
  expect(r1).not.to.be.deep.equal(r2);
});
