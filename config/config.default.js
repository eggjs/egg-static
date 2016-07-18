'use strict';

const path = require('path');

module.exports = appInfo => {
  const exports = {};

  /**
   * Static file serve
   *
   * @member Config#static
   * @property {String} prefix - `/public/` by default
   * @property {String} dir - static files store dir, `${baseDir}/app/public` by default
   * @property {Number} maxAge - cache max age, default is one year
   */
  exports.static = {
    prefix: '/public/',
    dir: path.join(appInfo.baseDir, 'app/public'),
    // maxAge: 31536000,
    // buffer: false,
    // dynamic: false,
  };
  return exports;
};
