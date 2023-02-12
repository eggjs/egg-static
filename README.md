# egg-static

[![NPM version][npm-image]][npm-url]
[![Test coverage][codecov-image]][codecov-url]
[![npm download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/egg-static.svg?style=flat-square
[npm-url]: https://npmjs.org/package/egg-static
[codecov-image]: https://codecov.io/github/eggjs/egg-static/coverage.svg?branch=master
[codecov-url]: https://codecov.io/github/eggjs/egg-static?branch=master
[download-image]: https://img.shields.io/npm/dm/egg-static.svg?style=flat-square
[download-url]: https://npmjs.org/package/egg-static

Static server plugin for egg, base on [koa-static-cache](https://github.com/koajs/static-cache).

## Install

`egg-static` is a plugin that has been built-in for egg. It is enabled by default.

## Configuration

egg-static support all configurations in [koa-static-cache](https://github.com/koajs/static-cache). and with default configurations below:

- prefix: `'/public/'`
- dir: `path.join(appInfo.baseDir, 'app/public')`
- dynamic: `true`
- preload: `false`
- maxAge: `31536000` in prod env, `0` in other envs
- buffer: `true` in prod env, `false` in other envs

`egg-static` provides one more option:

- maxFiles: the maximum value of cache items, only effective when dynamic is true, default is `1000`.

**All static files in `$baseDir/app/public` can be visited with prefix `/public`, and all the files are lazy loaded.**

- In non-production environment, assets won't be cached, your modification can take effect immediately.
- In production environment, `egg-static` will cache the assets after visited, you need to restart the process to update the assets.
- Dir default is `$baseDir/app/public` but you can also define **multiple directory** by use `dir: [dir1, dir2, ...]` or `dir: [dir1, { prefix: '/static2', dir: dir2 }]`, static server will use all these directories.

```js
// {app_root}/config/config.default.js
exports.static = {
  // maxAge: 31536000,
};
```

## Questions & Suggestions

Please open an issue [here](https://github.com/eggjs/egg/issues).

## License

[MIT](https://github.com/eggjs/egg-static/blob/master/LICENSE)

<!-- GITCONTRIBUTOR_START -->

## Contributors

|[<img src="https://avatars.githubusercontent.com/u/985607?v=4" width="100px;"/><br/><sub><b>dead-horse</b></sub>](https://github.com/dead-horse)<br/>|[<img src="https://avatars.githubusercontent.com/u/156269?v=4" width="100px;"/><br/><sub><b>fengmk2</b></sub>](https://github.com/fengmk2)<br/>|[<img src="https://avatars.githubusercontent.com/u/227713?v=4" width="100px;"/><br/><sub><b>atian25</b></sub>](https://github.com/atian25)<br/>|[<img src="https://avatars.githubusercontent.com/u/360661?v=4" width="100px;"/><br/><sub><b>popomore</b></sub>](https://github.com/popomore)<br/>|[<img src="https://avatars.githubusercontent.com/u/2127199?v=4" width="100px;"/><br/><sub><b>okoala</b></sub>](https://github.com/okoala)<br/>|[<img src="https://avatars.githubusercontent.com/u/559179?v=4" width="100px;"/><br/><sub><b>airyland</b></sub>](https://github.com/airyland)<br/>|
| :---: | :---: | :---: | :---: | :---: | :---: |
[<img src="https://avatars.githubusercontent.com/u/1798364?v=4" width="100px;"/><br/><sub><b>helloyou2012</b></sub>](https://github.com/helloyou2012)<br/>|[<img src="https://avatars.githubusercontent.com/u/8816730?v=4" width="100px;"/><br/><sub><b>maxming2333</b></sub>](https://github.com/maxming2333)<br/>

This project follows the git-contributor [spec](https://github.com/xudafeng/git-contributor), auto updated at `Sun Feb 12 2023 17:38:47 GMT+0800`.

<!-- GITCONTRIBUTOR_END -->
