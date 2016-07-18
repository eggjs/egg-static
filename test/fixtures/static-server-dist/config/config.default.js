module.exports = info => {
  return {
    static: {
      prefix: '/static',
      dir: info.baseDir + '/dist/static',
      buffer: true,
    }
  };
};
