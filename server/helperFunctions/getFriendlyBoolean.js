const axios = require('axios');

const generateInteraction = require('./generateInteraction');

const getFriendlyBoolean = (userId, tweetId, isAd) => {
  axios.get('http://127.0.0.1:3000/user', {
    params: {
      user_id: userId,
      tweet_id: tweetId,
    },
  }) // TODO: change this to Aygerim's actual service
    .then((response) => {
      generateInteraction(userId, tweetId, isAd, response.data); 
    })
    .catch((err) => {
      console.log('There was an error retreiving friend boolean: ', err);
    });
};

module.exports = getFriendlyBoolean;
