'use strict';
const request = require('supertest');
const async = require('async');
const app = require('../index');

function finish(done) {
  return (err) => {
    if (err) done.fail(err);
    else done();
  }
}

describe('express application', () => {

  it('/', (done) => {
    request(app)
      .get('/')
      .expect(200, 'Hello, world!', finish(done));
  });

  it('/hello/:name', (done) => {
    request(app)
      .get('/hello/Freewind')
      .expect(200, 'Hello, Freewind', finish(done));
  });

  describe('save', ()=> {
    beforeEach((done)=> {
      request(app).del('/saved').expect(204, finish(done));
    });

    it('/save', (done) => {
      request(app)
        .post('/save')
        .send({name: 'Freewind'})
        .expect('Content-Type', /json/)
        .expect(201, {name: 'Freewind'}, finish(done));
    });

    it('/saved', (done) => {
      async.series([
        (cb) => request(app).post('/save').send({name: 'Freewind'}).expect(201, cb),
        (cb) => request(app).post('/save').send({name: 'Lily'}).expect(201, cb),
        (cb) => request(app).get('/saved').expect(200, [{name: 'Freewind'}, {name: 'Lily'}], cb)
      ], finish(done));
    })
  });

});