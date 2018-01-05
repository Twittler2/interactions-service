const getFriendlyBoolean = require('./getFriendlyBoolean');
const generateInteraction = require('./generateInteraction');

// recursive function to create calls to Aygerim's service
module.exports = function createFriendQueryRequest(response, tweets) {
  // create the array of tweets
  const arrayOfTweetIds = [];
  const arrayOfIsAds = [];

  tweets.forEach((tweet, idx) => {
    arrayOfTweetIds.push(tweet.tweet_id);
    arrayOfIsAds.push(tweet.isad);
  });

  return getFriendlyBoolean(response.data.user_id, arrayOfTweetIds, arrayOfIsAds)
    .then((res) => {
      // creates an array of generateInteraction requests using res.data from Social Graph Service
      return Promise.all(arrayOfTweetIds.map((tweetId, index) => {
        return generateInteraction(response.data.user_id, tweetId, arrayOfIsAds[index], res.data.results[index]);
      }))
        .then((res) => {
          return Promise.resolve();
        })
        .catch((err) => {
          console.log('There was an error in generating interactions');
          return Promise.reject();
        });
    })
    .catch((err) => {
      console.log('There was an error retreiving friend boolean: ', err);
      return Promise.reject();
    });
};
