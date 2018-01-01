const axios = require('axios');

const { generateUserID } = require('./dataGeneration');
const createFriendQueryRequests = require('./createFriendQueryRequest');

const getFeed = () => {
  const user = generateUserID();

  return axios.get(`http://127.0.0.1:3000/feed/${user}`) // WILL EVENTUALLY ADD JUN'S SERVICE HERE
    .then((response) => { // If i get a proper response from feeds
      console.log('Successfuly got feed object: ', response.data);
      const { tweets } = response.data;

      // call to create all requests to Social Graph Service
      return Promise.resolve(createFriendQueryRequests(response, tweets));
    })
    .catch((err) => {
      console.log('There was an error in GETting the feed object: ');
      console.log(err);
      return Promise.reject();
    });
};

module.exports = getFeed;

