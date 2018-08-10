'use strict';

const path = require('path');
const fs = require('mz/fs');
const assert = require('assert');
const request = require('supertest');
const mm = require('egg-mock');

describe('test/static.test.js', () => {
  describe('serve public', () => {
    let app;
    before(() => {
      app = mm.app({
        baseDir: 'static-server',
      });
      return app.ready();
    });

    after(() => app.close());

    it('should get exists js file', () => {
      return request(app.callback())
        .get('/public/foo.js')
        .expect(/console.log\(\'bar\'\);[\r\n]/)
        .expect(200);
    });

    it('should get /public 404', () => {
      return request(app.callback())
        .get('/public')
        .expect(404);
    });

    it('should 404', () => {
      return request(app.callback())
        .get('/public/foo404.js')
        .expect(404);
    });
    it('should return 206 with partial content', () => {
      return request(app.callback())
        .get('/public/foo.js')
        .set('range', 'bytes=0-10')
        .expect('Content-Length', '11')
        .expect('Accept-Ranges', 'bytes')
        .expect('Content-Range', 'bytes 0-10/20')
        .expect('console.log')
        .expect(206);
    });
    it('should range don\'t effect non static router', () => {
      return request(app.callback())
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
      app = mm.app({
        baseDir: 'static-server-dist',
      });
      return app.ready();
    });

    after(() => app.close());
    after(() => fs.unlink(jsFile));

    it('should get js', () => {
      return request(app.callback())
        .get('/static/app/assets/foo-a1eb2031.js')
        .expect(/define\("static\/app\/assets\/foo-a1eb2031"/)
        .expect(200);
    });

    it('should cache file', done => {
      request(app.callback())
        .get('/static/app/a.js')
        .expect('console.log(\'a\')')
        .expect(200, err => {
          assert(!err);

          fs.writeFile(jsFile, 'console.log(\'b\')', () => {
            request(app.callback())
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
      app = mm.app({
        baseDir: 'static-server-custom',
      });
      return app.ready();
    });

    after(() => app.close());

    it('should get js', () => {
      return request(app.callback())
        .get('/static-custom/app/assets/foo-a1eb2031.js')
        .expect(/define\("static\/app\/assets\/foo-a1eb2031"/)
        .expect(200);
    });
  });

  describe('serve multiple dist', () => {
    let app;
    const jsFile = path.join(__dirname, 'fixtures/static-server-multiple-dist/dist/static/app/a.js');
    before(() => {
      fs.writeFileSync(jsFile, 'console.log(\'a\')');
      app = mm.app({
        baseDir: 'static-server-multiple-dist',
      });
      return app.ready();
    });

    after(() => app.close());
    after(() => fs.unlink(jsFile));

    it('should get js correct from public folder', () => {
      return request(app.callback())
        .get('/public/foo.js')
        .expect(/console.log\(\'bar\'\);[\r\n]/)
        .expect(200);
    });

    it('should get js correct with range support', () => {
      return request(app.callback())
        .get('/public/foo.js')
        .set('range', 'bytes=0-10')
        .expect('Content-Length', '11')
        .expect('Accept-Ranges', 'bytes')
        .expect('Content-Range', 'bytes 0-10/20')
        .expect('console.log')
        .expect(206);
    });

    it('should get js correct from dist folder', () => {
      return request(app.callback())
        .get('/static/app/assets/foo-a1eb2031.js')
        .expect(/define\("static\/app\/assets\/foo-a1eb2031"/)
        .expect(200);
    });

    it('should cache file', done => {
      request(app.callback())
        .get('/static/app/a.js')
        .expect('console.log(\'a\')')
        .expect(200, err => {
          assert(!err);

          fs.writeFile(jsFile, 'console.log(\'b\')', () => {
            request(app.callback())
              .get('/static/app/a.js')
              .expect('console.log(\'a\')')
              .expect(200, done);
          });
        });
    });
  });
});
