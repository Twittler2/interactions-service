const cassandra = require('cassandra-driver');
const axios = require('axios');

const { client } = require('./index');
const dataGeneration = require('./../server/helperFunctions/dataGeneration');

/* -------------------- DATA GENERATION BELOW ---------------------- */
/*
----------- COMMAND USED TO CREATE KEYSPACE (DATABASE)
CREATE KEYSPACE pjm
  WITH REPLICATION = { 'class': 'SimplyStrategy', 'replication_factor': 3 }

----------- COMMAND USED TO CREATE TABLE (INTERACTIONS)
CREATE TABLE interactions (
  intr_id uuid,
  user_id int,
  tweet_id varchar,
  isad boolean,
  friendly_intr boolean,
  intr_time timestamp,
  PRIMARY KEY (intr_id)
);

----------- COMMAND USED TO INSERT RECORD
INSERT INTO interactions (intr_id, user_id, tweet_id, isad, friendly_intr, intr_time)
  VALUES (**uuid**, **int**, **text**, **boolean**, **boolean**, **timestamp**)

*/

function createSingleInsert() {
  const intr_id = dataGeneration.generateIntrID(); // random interaction
  const user_id = dataGeneration.generateUserID();
  const tweet_id = dataGeneration.generateTweetID();
  const isad = dataGeneration.tweetIsAd();
  const friend_intr = dataGeneration.friendlyInter(isad);
  const time = dataGeneration.generateTimestamp();

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
  console.log('Data records: ', batchNumber * 100);
  batchNumber += 1;

  const queries = [];

  for (let i = 0; i < 100; i++) {
    queries.push(createSingleInsert());
  }

  return queries;
}

function createOneMillionEntries(int = 0) {
  if (int === 1000000) {
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

// creates 1 feed request
axios.post('http://127.0.0.1:3000/testinput')
  .then((response) => {
    console.log('Successful post');
  })
  .catch((err) => {
    console.log('There was an error with the post');
  });
