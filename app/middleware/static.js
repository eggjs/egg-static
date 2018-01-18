'use strict';

const range = require('koa-range');
const compose = require('koa-compose');
const staticCache = require('koa-static-cache');
const assert = require('assert');
const mkdirp = require('mkdirp');
const LRU = require('ylru');

module.exports = (options, app) => {
  const dirs = options.dir;
  const middlewares = [];

  if (options.range !== false) {
    middlewares.push(range);
  }

  if (options.dynamic && !options.files) {
    options.files = new LRU(options.maxFiles);
  }

  if (!Array.isArray(dirs)) {
    assert.strictEqual(typeof options.dir, 'string', 'Must set `app.config.static.dir` when static plugin enable');
    // ensure directory exists
    mkdirp.sync(options.dir);

    app.loggers.coreLogger.info('[egg-static] starting static serve %s -> %s', options.prefix, options.dir);

    middlewares.push(staticCache(options));

    return compose(middlewares);
  }


  for (const [ idx, dir ] of dirs.entries()) {
    // copy origin options to new options
    // ensure the safety of objects
    const newOptions = Object.assign({}, options);
    newOptions.dir = dir;
    assert.strictEqual(typeof newOptions.dir, 'string', 'Must set `app.config.static.dir[' + idx + ']` when static plugin enable');

    // ensure directory exists
    mkdirp.sync(newOptions.dir);

    app.loggers.coreLogger.info('[egg-static] starting static serve %s -> %s', newOptions.prefix, newOptions.dir);

    middlewares.push(staticCache(newOptions));
  }

  return compose(middlewares);
};
