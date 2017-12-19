const getFriendlyBoolean = require('./getFriendlyBoolean');
const generateInteraction = require('./generateInteraction');

// recursive function to create calls to Aygerim's service
module.exports = function createFriendQueryRequest(response, tweets) {
  // returns an iterable array of request promises to Social Graph Service
  return Promise.all(tweets.map((tweet) => {
    return getFriendlyBoolean(response.data.user_id, tweet.tweet_id, tweet.isad)
      .then((res) => {
        return generateInteraction(response.data.user_id, tweet.tweet_id, tweet.isad, res.data);
      });
  }))
    .catch((err) => {
      console.log('There was an error retreiving friend boolean: ', err);
      return Promise.reject();
    });
};
