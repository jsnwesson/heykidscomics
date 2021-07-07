const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/marvel', {useNewUrlParser: true,  useCreateIndex: true, useUnifiedTopology: true});
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {
  console.log('we are connected to the database!')
});

let list = mongoose.Schema({
  id: {type: Number, unique: true},
  digitalId: Number,
  title: String,
  issue: Number,
  thumbnail: String,
  image: String,
  listCollection: String,
  read: Boolean,
})

let List = mongoose.model('lists', list);

let getCollection = (request) => {
  List.find(request)
    .then(data => {
      return data;
    })
    .catch(err => {
      console.log(err);
    })
}

let saveIssue = (userResults) => {
  let savedData = [];
  userResults.forEach((data) => {
    const entry = new List({
      id: data.id,
      digitalId: data.digitalId,
      title: data.title,
      issue: data.issue,
      thumbnail: data.thumbnail,
      image: data.image,
      listCollection: data.collection,
      read: false,
    })
    savedData.push(entry.save((err, savedResponse) => {
      if (err) {
        console.log(err);
      } else {
        return savedResponse;
      }
    }));
  })
};

module.exports.saveIssue = saveIssue;
module.exports.getCollection = getCollection;
