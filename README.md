# egg-static

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][codecov-image]][codecov-url]
[![David deps][david-image]][david-url]
[![Known Vulnerabilities][snyk-image]][snyk-url]
[![npm download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/egg-static.svg?style=flat-square
[npm-url]: https://npmjs.org/package/egg-static
[travis-image]: https://img.shields.io/travis/eggjs/egg-static.svg?style=flat-square
[travis-url]: https://travis-ci.org/eggjs/egg-static
[codecov-image]: https://codecov.io/github/eggjs/egg-static/coverage.svg?branch=master
[codecov-url]: https://codecov.io/github/eggjs/egg-static?branch=master
[david-image]: https://img.shields.io/david/eggjs/egg-static.svg?style=flat-square
[david-url]: https://david-dm.org/eggjs/egg-static
[snyk-image]: https://snyk.io/test/npm/egg-static/badge.svg?style=flat-square
[snyk-url]: https://snyk.io/test/npm/egg-static
[download-image]: https://img.shields.io/npm/dm/egg-static.svg?style=flat-square
[download-url]: https://npmjs.org/package/egg-static

Static server plugin for egg, base on [koa-static-cache](https://github.com/koajs/static-cache).

> Note: `koa-static-cache` cache the assets on initialization, so you need to restart the process to update the assets, and don't put too many files in it, or use `filter` options.

## Install

```bash
$ npm i egg-static --save
```

## Usage

`egg-static` is a plugin that has been built-in for egg. But it is disabled by default.

```js
// {app_root}/config/plugin.js
exports.static = true;
```

## Configuration

Support all configurations in [koa-static-cache](https://github.com/koajs/static-cache).

```js
// {app_root}/config/config.default.js
exports.static = {
  // maxAge: 31536000,
};
```

## Questions & Suggestions

Please open an issue [here](https://github.com/eggjs/egg/issues).

## License

[MIT](LICENSE)
