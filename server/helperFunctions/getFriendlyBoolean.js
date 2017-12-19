const axios = require('axios');

const getFriendlyBoolean = (userId, tweetId, isAd) => {
  return axios.get('http://127.0.0.1:3000/user', {
    params: {
      user_id: userId,
      tweet_id: tweetId, // literally turns into http://127.0.0.1:3000/user?user_id=userId&tweet_id=tweetId
    },
  }); // TODO: change this to Aygerim's actual service
};

module.exports = getFriendlyBoolean;
