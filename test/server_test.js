// const { expect } = require('chai');
// const chai = require('chai');
// const supertest = require('supertest');
// const chaiHttp = require('chai-http');
// const server = require('../server/index.js');

// chai.use(chaiHttp);

// will need to change these tests for my specific routes 

// describe('Server', () => {
//   it ('should return 200 from /tweets/events', (done) => {
//     chai.request(server)
//       .post('/tweets/events')
//       .send([])
//       .end((err, res) => {
//         expect(res).to.have.status(200);
//         done();
//       });
//   });

//   it ('should return 200 from /interactors/:tweet_id', (done) => {
//     chai.request(server)
//       .get('/interactors/5')
//       .send([])
//       .end((err, res) => {
//         expect(res).to.have.status(200);
//         done();
//       });
//   });

//   it ('should return 200 from /friends/:user_id', (done) => {
//     chai.request(server)
//       .post('/friends/7')
//       .send([])
//       .end((err, res) => {
//         expect(res).to.have.status(200);
//         done();
//       });
//   });
// });