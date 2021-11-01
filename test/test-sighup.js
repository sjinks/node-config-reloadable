const { expect } = require('chai');
const path = require('path');

process.env.NODE_CONFIG_DIR = path.join(__dirname, 'config');
process.env.NODE_CONFIG = '{ "prop": "value" }';

const config = require('../index');

let conf = config();
let reloaded = false;

process.on('SIGHUP', function () {
  conf = config.reloadConfigs();
  reloaded = true;
});

it('Test config reload on SIGHUP', function (done) {
  const r1 = conf.get('rand');

  reloaded = false;
  process.kill(process.pid, 'SIGHUP');

  const runTest = () => {
    const r2 = conf.get('rand');
    expect(r1).not.to.be.deep.equal(r2);
  };

  const wait = () => {
    if (!reloaded) {
      setTimeout(wait, 10);
    } else {
      runTest();
      done();
    }
  };

  // Signal delivery is asynchronous
  setTimeout(wait, 10);
});
