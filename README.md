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

## Install

```bash
$ npm i egg-static --save
```

## Usage

- plugin.js

```js
exports.static = {
  enable: true,
  package: 'egg-static',
};
```

## Configuration

`egg-static` support all configurations in [koa-static-cache](https://github.com/koajs/static-cache). and with below default configurations:

- prefix: `'/public/'`
- dir: `path.join(appInfo.baseDir, 'app/public')`
- dynamic: `true`
- preload: `false`
- maxAge: `31536000` in prod env, `0` in other envs
- buffer: `true` in prod env, `false` in other envs

With these default configurations, all static files in `$baseDir/app/public` can be visited with prefix `/public`, and all the files are lazy loaded.

In production environment, files will be cached in memory, you need to restart the process to update the assets.

## Questions & Suggestions

Please open an issue [here](https://github.com/eggjs/egg/issues).

## License

[MIT](LICENSE)
