const path = require('path');

module.exports = info => {
  const exports = {};

  exports.static = {
    prefix: '/static-custom',
    dir: path.join(info.baseDir, 'dist/static')
  };

  return exports;
};
