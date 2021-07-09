const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

mongoose.connect('mongodb://localhost/marvel', {useNewUrlParser: true,  useCreateIndex: true, useUnifiedTopology: true});
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {
  console.log('we are connected to the database!')
});

let list = mongoose.Schema({
  id: {type: Number, unique: true},
  issueId: {type: Number, unique: true},
  digitalId: Number,
  title: String,
  issue: Number,
  thumbnail: String,
  url: String,
  listCollection: String,
  read: Boolean,
})

let listTitles = mongoose.Schema({
  title: {type: String, unique: true},
})

list.plugin(AutoIncrement, {id: 'order_seq', inc_field: 'id'});
let List = mongoose.model('lists', list);
let ListTitles = mongoose.model('listtitles', listTitles);

let getCollection = (request, callback) => {
  List.find(request, (err, response) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, response);
    }
  })
}

let getCollectionList = (callback) => {
  ListTitles.find({}, (err, data) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, data);
    }
  })
}

let saveCollection = (collectionTitle, callback) => {
  const title = new ListTitles ({
    title: collectionTitle,
  })
  console.log(title, collectionTitle)
  title.save((err, response) => {
    if (err) {
      console.log(err);
    } else {
      console.log(response);
    }
  })
}

let saveIssue = (userResults, callback) => {
  let savedData = [];
  if (Array.isArray(userResults)) {
    userResults.forEach((data) => {
      const entry = new List({
        issueId: data.issueId,
        digitalId: data.digitalId,
        title: data.title,
        issue: data.issue,
        thumbnail: data.thumbnail,
        url: data.url,
        listCollection: data.listCollection,
        read: false,
      })
      savedData.push(entry.save((err, savedResponse) => {
        if (err) {
          callback(err, null);
        } else {
          callback(null, savedResponse);
        }
      }));
    })
  } else {
    const entry = new List({
      issueId: userResults.id,
      digitalId: userResults.digitalId,
      title: userResults.title,
      issue: userResults.issue,
      thumbnail: userResults.thumbnail,
      url: userResults.url,
      listCollection: userResults.listCollection,
      read: false,
    });
    entry.save((err, savedResponse) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, savedResponse);
      }
    })
  }
};


module.exports.saveCollection = saveCollection;
module.exports.saveIssue = saveIssue;
module.exports.getCollection = getCollection;
module.exports.getCollectionList = getCollectionList;