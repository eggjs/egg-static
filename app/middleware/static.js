'use strict';

const staticCache = require('koa-static-cache');
const assert = require('assert');
const mkdirp = require('mkdirp');

module.exports = (options, app) => {
  assert.strictEqual(typeof options.dir, 'string', 'Must set `app.config.static.dir` when static plugin enable');

  // ensure directory exists
  mkdirp.sync(options.dir);

  app.loggers.coreLogger.info('[egg-static] starting static serve %s -> %s', options.prefix, options.dir);

  return staticCache(options);
};
