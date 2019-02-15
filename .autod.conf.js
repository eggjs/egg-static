'use strict';

module.exports = {
  write: true,
  prefix: '^',
  test: [
    'test',
    'benchmark',
  ],
  devdep: [
    'autod',
    'egg-ci',
    'egg-bin',
    'eslint',
    'eslint-config-egg',
    'egg',
  ],
  exclude: [
    './test/fixtures',
  ],
}
