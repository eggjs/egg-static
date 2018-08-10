'use strict';

const range = require('koa-range');
const compose = require('koa-compose');
const staticCache = require('koa-static-cache');
const assert = require('assert');
const mkdirp = require('mkdirp');
const LRU = require('ylru');
const deprecate = require('depd')('egg-static');
const is = require('is-type-of');

module.exports = (options, app) => {
  let dirs;

  if (is.array(options.dir)) {
    dirs = options.dir;
    deprecate('options.dir array type support is deprecated, use options.dirs instead.');
  } else {
    dirs = options.dirs ? options.dirs : [ options.dir ];
  }


  if (options.dynamic && !options.files) {
    options.files = new LRU(options.maxFiles);
  }

  function rangeMiddleware(ctx, next) {
    if (options.prefix && !ctx.path.startsWith(options.prefix)) return next();
    return range(ctx, next);
  }

  const middlewares = [ rangeMiddleware ];

  for (const dirObj of dirs) {
    assert(is.object(dirObj) || is.string(dirObj), true, 'options.dir must be string or options.dirs must be string|object.');

    let newOptions;

    if (is.string(dirObj)) {
      newOptions = Object.assign({}, options);
      // copy origin options to new options
      // ensure the safety of objects
      newOptions.dir = dirObj;
    } else {
      assert(is.string(dirObj.dir), true, 'options.dirs.dir must exist when options.dirs is object.');
      newOptions = Object.assign({}, options, dirObj);
    }

    // ensure directory exists
    mkdirp.sync(newOptions.dir);

    app.loggers.coreLogger.info('[egg-static] starting static serve %s -> %s', newOptions.prefix, newOptions.dir);

    middlewares.push(staticCache(newOptions));
  }

  return compose(middlewares);
};
