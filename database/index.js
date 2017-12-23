const cassandra = require('cassandra-driver');

// --------- SETTING UP AND EXPORTING DATABASE REQUIRED UP HERE ----------
const client = new cassandra.Client({ contactPoints: ['127.0.0.1:9042'], keyspace: 'pjm' });

client.connect((err) => {
  if (err) {
    console.log('There was an error connecting to database');
  } else {
    console.log('Successfully connected to database');
  }
});

module.exports = { client };
//------------------------------------------------------------------------
