const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/marvel', {useNewUrlParser: true,  useCreateIndex: true, useUnifiedTopology: true});
//change IP based on mongoDB instance
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {
  console.log('we are connected to the database!')
});