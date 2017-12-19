const uuidv4 = require('uuid/v4');
const randomstring = require('randomstring');

// generates random UUID for interaction ID
function generateIntrID() {
  return uuidv4();
}

// Generates random userID
function generateUserID() {
  return Math.round(Math.random() * 10000000);
}

// Generates random tweetID
function generateTweetID() {
  return randomstring.generate(10);
}

// Generates boolean if tweet is an ad
function tweetIsAd() {
  const prob = Math.random();
  return prob > 0.2 ? false : true;
}

// Generates boolean if a user's friend interacted with an ad
function friendlyInter(ad) {
  const prob = Math.random();
  if (ad) { // if tweet is an add, make it more likely it was prompted by a friend's interaction
    return prob > 0.5; // if the interaction belongs to an ad (20% of cases), 
    // then make 50% of them friend-inspired interactions
  }
  return prob > 0.8;
}

// Generates a random timestamp over the course of 3 months
function generateTimestamp() {
  let currentTime = 1513196237428;
  let threeMonths = 7776000000;
  return currentTime + Math.round(Math.random() * threeMonths);
}


module.exports.generateIntrID = generateIntrID;
module.exports.generateUserID = generateUserID;
module.exports.generateTweetID = generateTweetID;
module.exports.tweetIsAd = tweetIsAd;
module.exports.friendlyInter = friendlyInter;
module.exports.generateTimestamp = generateTimestamp;
