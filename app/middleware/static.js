'use strict';

const staticCache = require('koa-static-cache');
const assert = require('assert');
const mkdirp = require('mkdirp');

module.exports = function(options, app) {
  assert.strictEqual(typeof options.dir, 'string',
    'Must set `app.config.static.dir` when static.enable = true');

  // ensure directory exists
  mkdirp.sync(options.dir);

  app.loggers.coreLogger.info('[egg-static] starting static serve %s -> %s',
    options.prefix, options.dir);

  return staticCache(options);
};
