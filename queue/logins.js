const kue = require('kue');
const getFeed2 = require('./../server/helperFunctions2/getFeed2');
const generateInteraction2 = require('./../server/helperFunctions2/generateInteraction2');
const addIntsToDB2 = require('./../server/helperFunctions2/addIntsToDB2');

const queue = kue.createQueue();

queue.on('connect', () => {
  console.log('Connected to Redis Queue');
});

// function for creating 'login' jobs
const createUserLogin = () => {
  const job = queue.create('login');
  job.attempts(1000)
    .priority('high')
    .save((err) => {
      if (!err) {
        // console.log(job.id);
      }
    });
};

queue.process('login', 1000, (job, done) => {
  // console.log(`Login and interactions for id ${job.id} is done`);

  const feed = getFeed2();
  const interactions = generateInteraction2(feed);
  
  if (interactions.length > 0) {
    // add interactions to the database
    Promise.all(interactions.map((tweet) => {
      return addIntsToDB2(tweet.user_id, tweet.tweet_id, tweet.isad, tweet.friendly);
    }))
      .then((res) => {
        done();
      })
      .catch((err) => {
        // console.log('There was an error adding interactions to the database');
      });
  } else {
    done();
  }
});


module.exports = {
  createLogin: () => {
    createUserLogin();
  },
};
