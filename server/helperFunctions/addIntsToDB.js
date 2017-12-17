const uuidv4 = require('uuid/v4');

const { client } = require('./../index');
const postIntsToTweets = require('./postIntsToTweets');

// function for generating random interaction UUID
function generateIntrID() {
  return uuidv4();
}

// generate random timestamp
function generateTimestamp() {
  const currentTime = 1513196237428;
  const threeMonths = 7776000000;
  return currentTime + Math.round(Math.random() * threeMonths);
}

// function to add a new record to the cassandra DB using once provided with a:
// userID, tweetID, isAd boolean, and friendly boolean
const addIntsToDB = (userId, tweetId, isAd, friendly) => {
  const intrId = generateIntrID();
  const intrTime = generateTimestamp();

  const query = 'INSERT INTO interactions (intr_id, user_id, tweet_id, isad, friendly_intr, intr_time) VALUES (?, ?, ?, ?, ?, ?)';
  const params = [intrId, userId, tweetId, isAd, friendly, intrTime];

  client.execute(query, params, { prepare: true })
    .then((result) => {
      console.log('Row updated in cassandra');
      postIntsToTweets(userId, tweetId);
    })
    .catch((err) => {
      console.log('Error with adding record to DB: ', err);
    });
};

module.exports = addIntsToDB;

