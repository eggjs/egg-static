'use strict';

const path = require('path');
const { fs } = require('mz');
const assert = require('assert');
const mock = require('egg-mock');

describe('test/static.test.js', () => {
  describe('serve public', () => {
    let app;
    before(() => {
      app = mock.app({
        baseDir: 'static-server',
      });
      return app.ready();
    });

    after(() => app.close());

    it('should get exists js file', () => {
      return app.httpRequest()
        .get('/public/foo.js')
        .expect(/console.log\(\'bar\'\);[\r\n]/)
        .expect(200);
    });

    it('should get /public 404', () => {
      return app.httpRequest()
        .get('/public')
        .expect(404);
    });

    it('should 404', () => {
      return app.httpRequest()
        .get('/public/foo404.js')
        .expect(404);
    });

    it('should return 206 with partial content', () => {
      return app.httpRequest()
        .get('/public/foo.js')
        .set('range', 'bytes=0-10')
        .expect('Content-Length', '11')
        .expect('Accept-Ranges', 'bytes')
        .expect('Content-Range', 'bytes 0-10/20')
        .expect('console.log')
        .expect(206);
    });

    it('should range don\'t effect non static router', () => {
      return app.httpRequest()
        .get('/foo/bar')
        .set('range', 'bytes=0-5')
        .expect('hello world')
        .expect(200);
    });
  });

  describe('serve dist', () => {
    let app;
    const jsFile = path.join(__dirname, 'fixtures/static-server-dist/dist/static/app/a.js');
    before(() => {
      fs.writeFileSync(jsFile, 'console.log(\'a\')');
      app = mock.app({
        baseDir: 'static-server-dist',
      });
      return app.ready();
    });

    after(() => app.close());
    after(() => fs.unlink(jsFile));

    it('should get js', () => {
      return app.httpRequest()
        .get('/static/app/assets/foo-a1eb2031.js')
        .expect(/define\("static\/app\/assets\/foo-a1eb2031"/)
        .expect(200);
    });

    it('should cache file', done => {
      app.httpRequest()
        .get('/static/app/a.js')
        .expect('console.log(\'a\')')
        .expect(200, err => {
          assert(!err);

          fs.writeFile(jsFile, 'console.log(\'b\')', () => {
            app.httpRequest()
              .get('/static/app/a.js')
              .expect('console.log(\'a\')')
              .expect(200, done);
          });
        });
    });
  });

  describe('serve custom using config.js', () => {
    let app;
    before(() => {
      app = mock.app({
        baseDir: 'static-server-custom',
      });
      return app.ready();
    });

    after(() => app.close());

    it('should get js', () => {
      return app.httpRequest()
        .get('/static-custom/app/assets/foo-a1eb2031.js')
        .expect(/define\("static\/app\/assets\/foo-a1eb2031"/)
        .expect(200);
    });
  });

  describe('serve multiple folder with options.dir', () => {
    let app;
    const jsFile = path.join(__dirname, 'fixtures/static-server-with-dir/dist/static/app/a.js');
    before(() => {
      fs.writeFileSync(jsFile, 'console.log(\'a\')');
      app = mock.app({
        baseDir: 'static-server-with-dir',
      });
      return app.ready();
    });

    after(() => app.close());
    after(() => fs.unlink(jsFile));

    it('should get js correct from public folder', () => {
      return app.httpRequest()
        .get('/public/foo.js')
        .expect(/console.log\(\'bar\'\);[\r\n]/)
        .expect(200);
    });

    it('should get js correct with range support', () => {
      return app.httpRequest()
        .get('/public/foo.js')
        .set('range', 'bytes=0-10')
        .expect('Content-Length', '11')
        .expect('Accept-Ranges', 'bytes')
        .expect('Content-Range', 'bytes 0-10/20')
        .expect('console.log')
        .expect(206);
    });

    it('should get js correct from dist folder', () => {
      return app.httpRequest()
        .get('/public/app/assets/foo-a1eb2031.js')
        .expect(/define\("static\/app\/assets\/foo-a1eb2031"/)
        .expect(200);
    });

    it('should cache file', done => {
      app.httpRequest()
        .get('/public/app/a.js')
        .expect('console.log(\'a\')')
        .expect(200, err => {
          assert(!err);

          fs.writeFile(jsFile, 'console.log(\'b\')', () => {
            app.httpRequest()
              .get('/public/app/a.js')
              .expect('console.log(\'a\')')
              .expect(200, done);
          });
        });
    });
  });

  describe('serve multiple folder with options.dirs', () => {
    let app;
    const jsFile = path.join(__dirname, 'fixtures/static-server-with-dirs/dist/static/app/a.js');
    before(() => {
      fs.writeFileSync(jsFile, 'console.log(\'a\')');
      app = mock.app({
        baseDir: 'static-server-with-dirs',
      });
      return app.ready();
    });

    after(() => app.close());
    after(() => fs.unlink(jsFile));

    it('should get js correct from public folder', () => {
      return app.httpRequest()
        .get('/public/foo.js')
        .expect(/console.log\(\'bar\'\);[\r\n]/)
        .expect(200);
    });

    it('should get js correct with range support', () => {
      return app.httpRequest()
        .get('/public/foo.js')
        .set('range', 'bytes=0-10')
        .expect('Content-Length', '11')
        .expect('Accept-Ranges', 'bytes')
        .expect('Content-Range', 'bytes 0-10/20')
        .expect('console.log')
        .expect(206);
    });

    it('should get js correct from dist folder', () => {
      return app.httpRequest()
        .get('/static/app/assets/foo-a1eb2031.js')
        .expect(/define\("static\/app\/assets\/foo-a1eb2031"/)
        .expect(200);
    });

    it('should cache file', done => {
      app.httpRequest()
        .get('/static/app/a.js')
        .expect('console.log(\'a\')')
        .expect(200, err => {
          assert(!err);

          fs.writeFile(jsFile, 'console.log(\'b\')', () => {
            app.httpRequest()
              .get('/static/app/a.js')
              .expect('console.log(\'a\')')
              .expect(200, done);
          });
        });
    });
  });
});
