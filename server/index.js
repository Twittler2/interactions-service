const nr = require('newrelic');

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const dotenv = require('dotenv');

const getFeed = require('./helperFunctions/getFeed');

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

app.post('/tweets/events', (request, response) => {
  console.log('Post to tweets successful');
  response.json();
});

app.get('/user', (request, response) => {
  console.log('Get to /user successful');
  response.json(!!Math.round(Math.random()));
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


app.post('/testinput', (request, response) => {
  getFeed() // returns a promise
    .then((res) => {
      response.json();
    })
    .catch((err) => {
      response.json();
    });
});

// -------------------------- END OF TESTING PORTION CODE -----------------------------------------

app.listen(PORT, () => console.log(`Listening on port ${PORT}! Let's friggin do this!`));

module.exports.app = app;
