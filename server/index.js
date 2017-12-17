const axios = require('axios');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const dotenv = require('dotenv');
const cassandra = require('cassandra-driver');

// data generation
const uuidv4 = require('uuid/v4');
const randomstring = require('randomstring');

dotenv.config();


const client = new cassandra.Client({ contactPoints: ['127.0.0.1:9042'], keyspace: 'pjm' });


const PORT = process.env.PORT || 3000;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// --------------------- the below endpoints are for testing purposes only -----------------------

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
      { tweet_id: 1, isad: false },
      { tweet_id: 2, isad: true },
      { tweet_id: 3, isad: false },
      { tweet_id: 4, isad: true },
      { tweet_id: 5, isad: false },
    ],
  });
});

// ------------------------------------------------------------------------------------------------

app.listen(PORT, () => console.log(`Listening on port ${PORT}! Let's friggin do this!`));


/* -------------------- DATA GENERATION ---------------------- */
/*
----------- COMMAND USED TO CREATE KEYSPACE (DATABASE)
CREATE KEYSPACE pjm
  WITH REPLICATION = { 'class': 'SimplyStrategy', 'replication_factor': 3 }

----------- COMMAND USED TO CREATE TABLE (INTERACTIONS)
CREATE TABLE interactions (
  intr_id uuid,
  user_id int,
  tweet_id int,
  isad boolean,
  friendly_intr boolean,
  intr_time timestamp,
  PRIMARY KEY (intr_id)
);

----------- COMMAND USED TO INSERT RECORD
INSERT INTO interactions (intr_id, user_id, tweet_id, isad, friendly_intr, intr_time)
  VALUES (**uuid**, **int**, **text**, **boolean**, **boolean**, **timestamp**)

*/


// generate random intr_id (uuid)
function generateIntrID() {
  return uuidv4();
}

// generate random user_id (int)
function generateUserID() {
  return Math.round(Math.random() * 999999999);
}

// genereate tweet_id (string)
function generateTweetID() {
  return randomstring.generate(15);
}

// generate boolean
function tweetIsAd() {
  const prob = Math.random();
  return prob > 0.2 ? false : true;
}

// generate friendlyInteraction
function friendlyInter(ad) {
  const prob = Math.random();
  if (ad) { // if tweet is an add, make it more likely it was prompted by a friend's interaction
    return prob > 0.5; // if the interaction belongs to an ad (20% of cases), then make 50% of them friend-inspired interactions
  }
  return prob > 0.8;
}

// generate random timestamp
function generateTimestamp() {
  let currentTime = 1513196237428;
  let threeMonths = 7776000000;
  return currentTime + Math.round(Math.random() * threeMonths);
}

function createSingleInsert() {
  const intr_id = generateIntrID(); // random interaction
  const user_id = generateUserID();
  const tweet_id = generateTweetID();
  const isad = tweetIsAd();
  const friend_intr = friendlyInter(isAd);
  const time = generateTimestamp();

  return {
    query: 'INSERT INTO interactions (intr_id, user_id, tweet_id, isad, friendly_intr, intr_time) VALUES (?, ?, ?, ?, ?, ?)',
    params: [
      intr_id, // intr_id
      user_id, // user_id
      tweet_id, // tweet_id
      isad, // isAd
      friend_intr, // friendly_intr
      time, // intr_time
    ],
  };
}

let batchNumber = 1

function createBatchInsert() {
  console.log('Data records: ', batchNumber * 50);
  batchNumber += 1;

  const queries = [];

  for (let i = 0; i < 50; i++) {
    queries.push(createSingleInsert());
  }

  return queries;
}

function createOneMillionEntries(int = 0) {
  if (int === 200000) {
    console.log('Creation complete');
    return;
  }
  client.batch(createBatchInsert(), { prepare: true })
    .then(() => {
      createOneMillionEntries(int + 1);
    })
    .catch((err) => {
      console.log(err);
    });
}

// uncomment the below line to generate the data
// createOneMillionEntries(0);


module.exports.app = app;
module.exports.client = client;
