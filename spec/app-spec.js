const request = require('supertest');
const app = require('../index');

function finishTest(done) {
  return (err) => {
    if (err) {
      done.fail(err);
    } else {
      done();
    }
  }
}

describe('express application', () => {

  it('/', (done) => {
    request(app)
      .get('/')
      .expect(200, 'Hello, world!', finishTest(done));
  });

  it('/hello/:name', (done) => {
    request(app)
      .get('/hello/Freewind')
      .expect(200, 'Hello, Freewind', finishTest(done));
  });

  it('/save', (done) => {
    request(app)
      .post('/save')
      .send({
        name: 'Freewind'
      })
      .expect('Content-Type', /json/)
      .expect(201, {
        name: 'Freewind'
      }, finishTest(done));
  })

});