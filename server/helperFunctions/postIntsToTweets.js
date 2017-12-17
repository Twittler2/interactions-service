const axios = require('axios');

const postIntsToTweets = (userId, tweetId) => {
  axios.post('http://127.0.0.1:3000/tweets/events', { // TODO: change this to connect with Nick's service
    user_id: userId,
    tweet_id: tweetId,
  })
    .then((response) => {
      console.log('Interaction posted to Tweet service successfully');
    })
    .catch((err) => {
      console.log('Interaction failed to post to tweet service: ', err);
    });
};

module.exports = postIntsToTweets;
