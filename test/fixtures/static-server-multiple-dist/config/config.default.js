const path = require('path');

module.exports = appInfo => {
  const dirs = [
    path.join(appInfo.baseDir, '/dist/static'),
    path.join(appInfo.baseDir, '/app/public')
  ];
  return {
    static: {
      prefix: '/static',
      dir: dirs,
      buffer: true,
    }
  };
};
