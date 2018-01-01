const axios = require('axios');

const postIntsToTweets = (userId, tweetId) => {
  return axios.post('http://127.0.0.1:3000/tweets/events', { // TODO: CHANGE THIS TO CONNECT WITH NICK'S SERVICE
    user_id: userId,
    tweet_id: tweetId,
  })
    .then((response) => {
      console.log('Interaction posted to Tweet service successfully');
      return Promise.resolve();
    })
    .catch((err) => {
      console.log('Interaction failed to post to tweet service: ', err);
      return Promise.reject();
    });
};

module.exports = postIntsToTweets;
