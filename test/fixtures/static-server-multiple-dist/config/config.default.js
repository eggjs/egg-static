module.exports = info => {
  const dirs = [
    info.baseDir + '/dist/static',
    info.baseDir + '/app/public'
  ];
  return {
    static: {
      prefix: '/static',
      dir: dirs.join(','),
      buffer: true,
    }
  };
};
