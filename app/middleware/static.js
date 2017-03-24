'use strict';

const staticCache = require('koa-static-cache');
const assert = require('assert');
const mkdirp = require('mkdirp');

module.exports = (options, app) => {
  assert.strictEqual(typeof options.dir, 'string', 'Must set `app.config.static.dir` when static plugin enable');

  const dirs = options.dir.split(',');

  if (dirs.length === 1) {
    // ensure directory exists
    mkdirp.sync(options.dir);

    app.loggers.coreLogger.info('[egg-static] starting static serve %s -> %s', options.prefix, options.dir);

    return staticCache(options);
  }

  const middlewares = [];

  for (let i = 0; i < dirs.length; i++) {
    // copy origin options to new options
    // ensure the safety of objects
    const newOptions = Object.assign({}, options);
    const dir = dirs[i];
    newOptions.dir = dir;

    // ensure directory exists
    mkdirp.sync(dir);

    app.loggers.coreLogger.info('[egg-static] starting static serve %s -> %s', newOptions.prefix, newOptions.dir);

    middlewares.push(staticCache(newOptions));
  }

  const compose = require('koa-compose');
  return compose(middlewares);
};
