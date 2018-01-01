const axios = require('axios');

const getFriendlyBoolean = (userId, arrayOfTweetIds, arrayOfIsAds) => {
  return axios.get('http://127.0.0.1:3000/user', { // WILL PUT AYGERIM'S SERVICE HERE
    params: {
      user_id: userId,
      tweet_ids: arrayOfTweetIds, // literally turns into http://127.0.0.1:3000/user?user_id=userId&tweet_id=tweetId
    },
  }); // TODO: change this to Aygerim's actual service
};

module.exports = getFriendlyBoolean;
