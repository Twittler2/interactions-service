const { generateUserID } = require('./../helperFunctions/dataGeneration');

const getFeed2 = () => {
  const user = generateUserID();

  return {
    tweets: [
      { user_id: user, tweet_id: '1', isad: false, friendly: false },
      { user_id: user, tweet_id: '2', isad: true, friendly: true },
      { user_id: user, tweet_id: '3', isad: true, friendly: true },
      { user_id: user, tweet_id: '4', isad: false, friendly: false },
      { user_id: user, tweet_id: '5', isad: false, friendly: false },
    ],
  };
};

module.exports = getFeed2;

