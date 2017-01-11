'use strict';

const path = require('path');
const fs = require('fs');
const assert = require('assert');
const request = require('supertest-as-promised');
const mm = require('egg-mock');

describe('test/static.test.js', () => {
  describe('serve public', () => {
    let app;
    before(() => {
      app = mm.app({
        baseDir: 'static-server',
        customEgg: path.join(__dirname, '../node_modules/egg'),
      });
      return app.ready();
    });
    after(() => app.close());

    it('should get exists js file', () => {
      return request(app.callback())
        .get('/public/foo.js')
        .expect('alert(\'bar\');\n')
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
  });

  describe('serve dist', () => {
    let app;
    const jsFile = path.join(__dirname, 'fixtures/static-server-dist/dist/static/app/a.js');
    before(() => {
      fs.writeFileSync(jsFile, 'console.log(\'a\')');
      app = mm.app({
        baseDir: 'static-server-dist',
        customEgg: path.join(__dirname, '../node_modules/egg'),
      });
      return app.ready();
    });
    after(done => {
      app.close();
      fs.unlink(jsFile, done);
    });

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
        customEgg: path.join(__dirname, '../node_modules/egg'),
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
});
