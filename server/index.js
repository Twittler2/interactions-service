// const nr = require('newrelic');

const queue = require('./../queue/logins');

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const dotenv = require('dotenv');

const getFeed = require('./helperFunctions/getFeed');

const getFeed2 = require('./helperFunctions2/getFeed2');
const generateInteraction2 = require('./helperFunctions2/generateInteraction2');
const addIntsToDB2 = require('./helperFunctions2/addIntsToDB2');


dotenv.config();


const PORT = process.env.PORT || 3000;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// --------------------- the below endpoints are for testing purposes only -----------------------

// the below endpoint is used to test containerization
app.get('/', (request, response) => {
  response.send('-v mounts a volume on the CONTAINER - no change is needed on the actual image... Also, I dont even have nodemon running... jk, nodemon IS RUNNING');
});

app.post('/tweets/events', (request, response) => { // will be to Nick's service
  console.log('Post to tweets successful');
  response.json();
});

app.get('/user', (request, response) => { // will be to Aygerm
  console.log('Get to /user successful');
  response.json({ results: [true, false, false, true, true] });
});

app.get('/feed/:userId', (request, response) => {
  response.json({
    user_id: request.params.userId,
    tweets: [
      { tweet_id: '1', isad: false },
      { tweet_id: '2', isad: true },
      { tweet_id: '3', isad: true },
      { tweet_id: '4', isad: false },
      { tweet_id: '5', isad: false },
    ],
  });
});

// Endpoint '/testinput' used to simulate full app function by interacting with local server
app.post('/testinput', (request, response) => {
  getFeed() // returns a promise
    .then((res) => {
      response.json();
    })
    .catch((err) => {
      response.json();
    });
});

// Endpoint '/testinput2' used to simulate full app function by calling helper functions

app.post('/testinput2', (request, response) => {
  queue.createLogin();
  response.json();
});

// -------------------------- END OF TESTING PORTION CODE -----------------------------------------

app.listen(PORT, () => console.log(`Listening on port ${PORT}! Let's friggin do this!`));

module.exports.app = app;
