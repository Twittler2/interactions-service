const addIntsToDB = require('./addIntsToDB');

const generateInteraction = (userId, tweetId, isAd, friendly) => {
  const prob = Math.random();
  if (isAd && friendly && prob <= 0.075) {
    // if its an ad friends have interacted with => 7.5% chance for interaction
    return addIntsToDB(userId, tweetId, isAd, friendly);
  } else if (isAd && prob <= 0.025) {
    // if its an ad friends have NOT interacted with => 2.5% chance for interaction
    return addIntsToDB(userId, tweetId, isAd, friendly);
  } else if (friendly && prob <= 0.3) {
    // if its a regular tweet that friends have interacted with => 30% chance for interaction
    return addIntsToDB(userId, tweetId, isAd, friendly);
  } else if (prob <= 0.1) {
    // if its a regular tweet that friends have NOT interacted with => 10% chance for interaction
    return addIntsToDB(userId, tweetId, isAd, friendly);
  }

  // if there is no interaction
  return Promise.resolve();
};

module.exports = generateInteraction;

