const addIntsToDB = require('./addIntsToDB');

const generateInteraction = (userId, tweetId, isAd, friendly) => {
  addIntsToDB(userId, tweetId, isAd, friendly);
};

module.exports = generateInteraction;

