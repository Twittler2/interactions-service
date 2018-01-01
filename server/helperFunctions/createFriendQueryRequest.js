const getFriendlyBoolean = require('./getFriendlyBoolean');
const generateInteraction = require('./generateInteraction');

// recursive function to create calls to Aygerim's service
module.exports = function createFriendQueryRequest(response, tweets) {
  // ---- THE BELOW IS AN OLD WAY THAT SENDS 1 REQUEST PER TWEET TO SOCIAL GRAPH SERVICE ----
  // returns an iterable array of request promises to Social Graph Service
  // return Promise.all(tweets.map((tweet) => {
  //   return getFriendlyBoolean(response.data.user_id, tweet.tweet_id, tweet.isad)
  //     .then((res) => {
  //       return generateInteraction(response.data.user_id, tweet.tweet_id, tweet.isad, res.data);
  //     });
  // }))
  //   .catch((err) => {
  //     console.log('There was an error retreiving friend boolean: ', err);
  //     return Promise.reject();
  //   });
  // ----------------------------------------------------------------------------------------
  // --- NEW WAY THAT SENDS 1 REQUEST TO AYGERIM FOR THE ENTIRE BATCH OF TWEETS -------------
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
        })
        // generateInteraction(response.data.user_id, tweet.tweet_id, tweet.isad, res.data);
    })
    .catch((err) => {
      console.log('There was an error retreiving friend boolean: ', err);
      return Promise.reject();
    });
};
