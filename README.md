# node-config-reloadable

![Build and Test CI](https://github.com/sjinks/node-config-reloadable/workflows/Build%20and%20Test%20CI/badge.svg)
[![npm version](https://img.shields.io/npm/v/config-reloadable.svg)](https://www.npmjs.com/package/config-reloadable)
[![Scrutinizer Code Quality](https://scrutinizer-ci.com/g/sjinks/node-config-reloadable/badges/quality-score.png?b=master)](https://scrutinizer-ci.com/g/sjinks/node-config-reloadable/?branch=master)
[![Code Coverage](https://scrutinizer-ci.com/g/sjinks/node-config-reloadable/badges/coverage.png?b=master)](https://scrutinizer-ci.com/g/sjinks/node-config-reloadable/?branch=master)
[![Build Status](https://scrutinizer-ci.com/g/sjinks/node-config-reloadable/badges/build.png?b=master)](https://scrutinizer-ci.com/g/sjinks/node-config-reloadable/build-status/master)
[![js-semistandard-style](https://img.shields.io/badge/code%20style-semistandard-brightgreen.svg?style=flat-square)](https://github.com/Flet/semistandard)

Reloadable version of [lorenwest/node-config](https://github.com/lorenwest/node-config)

# Install

```sh
npm install --save config-reloadable
```

# Why?

It looks like there is no [official support](https://github.com/lorenwest/node-config/issues/34) for reloading configuration files;
instead, the author suggest a [workaround](https://github.com/lorenwest/node-config/issues/34#issuecomment-9039129), which, unfortunately,
does not always work (for example, if your configuration files are `*.js`).

`config-reloadable` forces `node-config` to reload configuration files by clearing the [require cache](https://nodejs.org/api/modules.html#modules_require_cache)
for both `node-config` itself and all configuration files that have been loaded.

# Example

```js
const config = require('config-reloadable');

console.log(config().something);

// Now change that `something`

config.reloadConfigs();

console.log(config().something);

// Displayed values should differ
```

Instead of `config.reloadConfigs()` it is possible to use `config(true)` (it is less intuitive but makes the code less verbose).

Reload configuration files on `SIGHUP`:

```js
const config = require('config-reloadable');

let conf = config();

process.on('SIGHUP', function () {
  conf = config.reloadConfigs();
});
```
