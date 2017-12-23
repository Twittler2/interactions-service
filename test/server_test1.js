const { expect } = require('chai');
const supertest = require('supertest');
const { app } = require('../server'); // gets the server running

const api = supertest('http://localhost:3000');


// Endpoint tests
describe('TEST SERVER ENDPOINTS', () => {
  it('should return a 200 response from /feed/8', (done) => {
    api.get('/feed/8')
      .expect(200, done);
  });


  it('should return a 200 response from /user', (done) => {
    api.get('/user')
      .expect(200, done);
  });

  it('should return 200 response from /tweets/events', (done) => {
    api.post('/tweets/events')
      .expect(200, done);
  });

  it('should return a 200 response from /testinput', (done) => {
    api.post('/testinput')
      .expect(200, done);
  });

});
