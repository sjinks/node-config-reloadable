const tap = require('tap');
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

tap.test('Test config reload on SIGHUP', function (t) {
  const r1 = conf.get('rand');

  reloaded = false;
  process.kill(process.pid, 'SIGHUP');
  t.plan(1);

  const runTest = () => {
    const r2 = conf.get('rand');
    t.notEqual(r1, r2);
  };

  const wait = () => {
    if (!reloaded) {
      setTimeout(wait, 10);
    } else {
      runTest();
    }
  };

  // Signal delivery is asynchronous
  setTimeout(wait, 10);
});
